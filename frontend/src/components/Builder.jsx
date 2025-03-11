import React, { useRef, useState } from 'react'
import ResumeForm from './ResumeForm'
import ResumeTemplate1 from './ResumeTemplate1'
import html2pdf from "html2pdf.js";

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
    <div>
    <div className="flex items-start justify-evenly gap-4">
      <ResumeForm formData={formData} setFormData={setFormData}/>
      <div ref={resumeRef} className="shadow-md">
          <ResumeTemplate1 formData={formData} />
      </div>
      {/* <ResumeTemplate1 formData={formData}/> */}
    </div>
    <button 
        onClick={handleDownloadPDF} 
        className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
      >
        Download PDF
      </button>
    </div>
  )
}

export default Builder



// import React, { useRef, useState } from "react";
// import ResumeForm from "./ResumeForm";
// import ResumeTemplate1 from "./ResumeTemplate1";
// import html2pdf from "html2pdf.js";

// const Builder = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     links: [{ type: "", url: "" }],
//     education: [{ university: "", degree: "", gpa: "", location: "", startDate: "", endDate: "" }],
//     experience: [{ company: "", role: "", location: "", startDate: "", endDate: "", description: "" }],
//     projects: [{ name: "", liveLink: "", repoLink: "", techStack: "", description: "" }],
//     skills: [{ ProgrammingLanguages: "", CoreCompetencies: "", Frameworks: "", TechStack: "", DeveloperTools: "", AdditionalSkills: "" }],
//     honors: [""]
//   });

//   // Reference for Resume Preview
//   const resumeRef = useRef(null);

//   // Function to generate PDF
//   const handleDownloadPDF = () => {
//     if (!resumeRef.current) {
//       console.error("Resume reference is null");
//       return;
//     }

//     html2pdf()
//       .from(resumeRef.current)
//       .save("Resume.pdf");
//   };

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="flex items-start gap-4">
//         {/* Left Side: Resume Form */}
//         <ResumeForm formData={formData} setFormData={setFormData} />

//         {/* Right Side: Resume Preview (To be Printed) */}
//         <div ref={resumeRef} className="border p-4 shadow-lg bg-white w-full">
//           <ResumeTemplate1 formData={formData} />
//         </div>
//       </div>

//       {/* Button to Download PDF */}
//       <button 
//         onClick={handleDownloadPDF} 
//         className="px-4 py-2 bg-green-600 text-white rounded-md mt-4"
//       >
//         Download PDF
//       </button>
//     </div>
//   );
// };

// export default Builder;
