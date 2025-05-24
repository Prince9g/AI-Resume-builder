import React, { useState, useRef } from "react";
import { Upload, Download, Edit3, Zap, FileText, Loader2 } from "lucide-react";
import run from './API';

const ResumeATSEnhancer = () => {
  const [jd, setJd] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeContent, setResumeContent] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState("input"); // "input", "uploaded", "analyzed"
  const fileInputRef = useRef(null);

  // Extract text from different file types
  const extractTextFromFile = (file) => {
    return new Promise((resolve, reject) => {
      if (file.type === "application/pdf") {
        // Dynamically import PDF.js for client-side only
        import("pdfjs-dist/build/pdf").then((pdfjs) => {
          pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
          
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              const typedArray = new Uint8Array(event.target.result);
              const pdf = await pdfjs.getDocument(typedArray).promise;
              let fullText = "";
              
              for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const text = textContent.items.map(item => item.str).join(" ");
                fullText += text + "\n";
              }
              
              resolve(fullText);
            } catch (error) {
              reject(error);
            }
          };
          reader.readAsArrayBuffer(file);
        });
      } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
                 file.type === "application/msword") {
        // Dynamically import Mammoth.js for DOCX files
        import("mammoth").then((mammoth) => {
          const reader = new FileReader();
          reader.onload = async (event) => {
            try {
              const result = await mammoth.extractRawText({ arrayBuffer: event.target.result });
              resolve(result.value);
            } catch (error) {
              reject(error);
            }
          };
          reader.readAsArrayBuffer(file);
        });
      } else if (file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.readAsText(file);
      } else {
        reject(new Error("Unsupported file type"));
      }
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match(/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document|plain)/)) {
      alert("Please upload a PDF, DOCX, or TXT file");
      return;
    }

    setLoading(true);
    try {
      const content = await extractTextFromFile(file);
      setResumeFile(file);
      setResumeContent(content);
      setStep("uploaded");
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Error processing file. Please try another file.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeJD = async () => {
    if (!jd.trim()) {
      alert("Please enter a job description");
      return;
    }
    if (!resumeContent.trim()) {
      alert("Please upload a resume first");
      return;
    }

    setLoading(true);
    try {
      const prompt = `Analyze this resume against the job description and provide specific ATS optimization recommendations:

Job Title: ${jd.split('\n')[0] || "Not specified"}
Job Description:
${jd}

Resume Content:
${resumeContent.substring(0, 3000)}${resumeContent.length > 3000 ? "..." : ""}

Provide:
1. Missing keywords from the JD that should be added
2. Resume sections that need improvement
3. Formatting suggestions for better ATS parsing
4. Specific content changes to better match the JD
5. Any irrelevant content that should be removed

Format your response with clear headings and bullet points.`;

      const response = await run(prompt);
      setAiResponse(response);
      setStep("analyzed");
    } catch (err) {
      console.error("AI API Error:", err);
      setAiResponse("Error contacting AI. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!resumeContent) {
      alert("No resume content to download");
      return;
    }

    const element = document.createElement("a");
    const file = new Blob([resumeContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = resumeFile 
      ? `enhanced_${resumeFile.name.replace(/\.[^/.]+$/, "")}.txt`
      : "enhanced_resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetAll = () => {
    setJd("");
    setResumeFile(null);
    setResumeContent("");
    setAiResponse("");
    setStep("input");
    setIsEditing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const applySuggestion = (suggestion) => {
    setResumeContent(prev => `${prev}\n\n[Applied Suggestion]: ${suggestion}`);
  };

  if (step === "input") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Resume ATS Enhancer</h1>
            <p className="text-gray-600">Optimize your resume for better ATS compatibility and job matching</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Job Description
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full border-2 border-gray-200 rounded-lg p-4 focus:border-purple-500 focus:outline-none transition-colors"
                rows={8}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Upload Resume (PDF, DOCX, TXT)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop or click to upload</p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Choose File
                </label>
              </div>
            </div>

            {loading && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500 mr-2" />
                <span className="text-blue-700">Processing your resume...</span>
              </div>
            )}

            {resumeFile && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">✓ Resume uploaded: {resumeFile.name}</p>
              </div>
            )}

            <button
              onClick={handleAnalyzeJD}
              disabled={loading || !jd.trim() || !resumeFile}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate AI Suggestions
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Panel - AI Suggestions */}
      <div className="w-full md:w-1/2 p-6 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">AI Suggestions</h2>
            <button
              onClick={resetAll}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Start Over
            </button>
          </div>
          
          {step === "uploaded" && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-700">Resume uploaded successfully! Click "Generate AI Suggestions" to analyze.</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              <span className="ml-2 text-gray-600">Analyzing your resume...</span>
            </div>
          )}

          {aiResponse && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
              <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                ATS Optimization Recommendations
              </h3>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
                  {aiResponse}
                </pre>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-purple-700 mb-2">Quick Apply Suggestions:</h4>
                <div className="flex flex-wrap gap-2">
                  {aiResponse.split('\n')
                    .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
                    .slice(0, 5) // Show only top 5 suggestions
                    .map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => applySuggestion(suggestion)}
                        className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <span>+</span>
                        <span className="max-w-xs truncate">{suggestion.substring(0, 40)}{suggestion.length > 40 ? '...' : ''}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Job Description Analysis</h4>
              <div className="text-sm text-gray-600 max-h-40 overflow-y-auto">
                {jd}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Resume Editor */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Resume Editor</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  isEditing 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-purple-500 hover:bg-purple-600 text-white"
                }`}
              >
                <Edit3 className="w-4 h-4" />
                {isEditing ? "Save Changes" : "Edit Resume"}
              </button>
              <button
                onClick={handleDownload}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
          
          {resumeFile && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">📄 {resumeFile.name}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 h-full">
          {isEditing ? (
            <textarea
              value={resumeContent}
              onChange={(e) => setResumeContent(e.target.value)}
              className="w-full h-96 border-none outline-none resize-none font-mono text-sm leading-relaxed"
              placeholder="Your resume content will appear here..."
            />
          ) : (
            <div className="h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800">
                {resumeContent || "Upload a resume to see the content here"}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeATSEnhancer;