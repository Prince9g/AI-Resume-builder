// ResumeAIHelper.js
import React, { useState } from "react";

const ResumeAIHelper = () => {
  const [jd, setJd] = useState("");
  const [resumePdfUrl, setResumePdfUrl] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyzeJD = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-maverick:free",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze the following job description and suggest how I should tailor my resume for it:\n\n${jd}`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: resumePdfUrl, // Ideally a screenshot or PDF image
                  },
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No response from AI.";
      console.log(reply);
      setAiResponse(reply);
    } catch (err) {
      console.error(err);
      setAiResponse("Error contacting AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Resume Tailor with AI</h2>

      <textarea
        value={jd}
        onChange={(e) => setJd(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full border rounded p-2 mb-4"
        rows={6}
      />

      <input
        type="text"
        placeholder="Paste public image URL of your resume PDF"
        value={resumePdfUrl}
        onChange={(e) => setResumePdfUrl(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={handleAnalyzeJD}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Generate Suggestions"}
      </button>

      {aiResponse && (
        <div className="mt-4 p-3 border rounded bg-gray-100">
          <h3 className="font-medium mb-2">AI Suggestions:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeAIHelper;
