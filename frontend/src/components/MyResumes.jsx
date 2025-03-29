import React, { useState } from "react";
import { MdOutlineFileDownload, MdEdit } from "react-icons/md";
import html2pdf from "html2pdf.js";

const ResumeList = ({ resumes, onEdit }) => {
  const [hoveredResume, setHoveredResume] = useState(null);

  const handleDownload = (resumeData, event) => {
    event.stopPropagation();
    
    // Create a temporary div to render the resume for PDF generation
    const tempDiv = document.createElement("div");
    tempDiv.style.width = "794px";
    tempDiv.style.height = "1123px";
    tempDiv.style.padding = "40px";
    tempDiv.style.backgroundColor = "white";
    document.body.appendChild(tempDiv);
    
    // Render the resume template
    ReactDOM.render(<ResumeTemplate1 formData={resumeData} />, tempDiv);
    
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${resumeData.name || "Resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(tempDiv)
      .save()
      .then(() => {
        document.body.removeChild(tempDiv);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {resumes.map((resume) => (
        <div
          key={resume._id}
          className="relative border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onMouseEnter={() => setHoveredResume(resume._id)}
          onMouseLeave={() => setHoveredResume(null)}
          onClick={() => onEdit(resume)}
        >
          <h3 className="text-xl font-bold">{resume.name || "Untitled Resume"}</h3>
          <p className="text-gray-600 text-sm truncate">{resume.email}</p>
          
          {/* Hover actions */}
          {(hoveredResume === resume._id) && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={(e) => handleDownload(resume, e)}
                className="p-2 bg-sky-400 text-white rounded-full hover:bg-sky-600 transition-all"
                title="Download PDF"
              >
                <MdOutlineFileDownload />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(resume);
                }}
                className="p-2 bg-green-400 text-white rounded-full hover:bg-green-600 transition-all"
                title="Edit Resume"
              >
                <MdEdit />
              </button>
            </div>
          )}
          
          {/* Mini preview (optional) */}
          <div className="mt-4 overflow-hidden" style={{ maxHeight: "200px" }}>
            <ResumeTemplate1 formData={resume} scale={0.3} />
          </div>
        </div>
      ))}
    </div>
  );
};