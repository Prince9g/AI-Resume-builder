import React, { useRef, useState } from 'react'
import ResumeForm from './ResumeForm'
import ResumeTemplate1 from './ResumeTemplate1'
import html2pdf from "html2pdf.js";
import { MdOutlineFileDownload } from "react-icons/md";
const Builder = () => {
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      links: [{ type: "", url: "" }],
      education: [{ university: "", degree: "", gpa: "", location: "", startDate: "", endDate: "" }],
      experience: [{ company: "", role: "", location: "", startDate: "", endDate: "", description: "" }],
      projects: [{ name: "", liveLink: "", repoLink: "", techStack: "", description: "" }],
      skills: [{ ProgrammingLanguages: "", CoreCompetencies: "", Frameworks: "", TechStack: "", DeveloperTools: "", AdditionalSkills: "" }],
      honors: [""]
    });

    // Reference for Resume Preview
    const resumeRef = useRef(null);

  // Function to generate PDF
    const handleDownloadPDF = () => {
      if (!resumeRef.current) {
        console.error("Resume reference is null");
        return;
    }

    html2pdf()
      .from(resumeRef.current)
      .save("Resume.pdf");
  };


  return (
    <div className="relative">
    <div className="flex items-start justify-evenly gap-4">
      <ResumeForm formData={formData} setFormData={setFormData}/>
      <div ref={resumeRef} className="shadow-md">
          <ResumeTemplate1 formData={formData} />
      </div>
      {/* <ResumeTemplate1 formData={formData}/> */}
    </div>
    <button 
        onClick={handleDownloadPDF} 
        className="p-3 bg-sky-400 text-white rounded-full absolute right-2 top-4 hover:bg-sky-600 transition-all duration-300"
      >
        <MdOutlineFileDownload className="text-3xl"/>
      </button>
    </div>
  )
}

export default Builder