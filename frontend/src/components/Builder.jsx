import React, { useState } from 'react'
import ResumeForm from './ResumeForm'
import ResumeTemplate1 from './ResumeTemplate1'

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

  return (
    <div className="flex items-start gap-4">
      <ResumeForm formData={formData} setFormData={setFormData}/>
      <ResumeTemplate1 formData={formData}/>
    </div>
  )
}

export default Builder
