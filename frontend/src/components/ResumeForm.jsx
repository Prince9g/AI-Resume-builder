import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import { PiBagSimpleLight } from "react-icons/pi";
import { PiHandCoinsLight } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { ChevronDown, ChevronUp } from "lucide-react";
const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    links:[{type:"", url:""}],
    education: [{ university: "", degree: "", gpa: "", location: "", startDate: "",  endDate: ""}],
    experience: [{ company: "", role: "", location: "", startDate: "",  endDate: "", description: "" }],
    projects: [{ name: "", liveLink: "", repoLink: "", techStack: "", description: "" }],
    skills: [{ProgrammingLanguages: "", CoreCompetencies: "", Frameworks: "", TechStack:"",DeveloperTools:"", AdditionalSkills: ""}],
    honors: ""
  });
   const [openSections, setOpenSections] = useState({
      personal: true,
      education: false,
      experience: false,
      projects: false,
      skills: false,
      honors: false
    });

    const toggleSection = (section) => {
      setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  const [selected, setSelected] = useState("LinkedIn");


  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3 mx-auto min-h-screen p-6 rounded-lg shadow-md">

      <h2 className="text-xl font-bold mb-4">Resume Details</h2>
      <div className="border flex flex-col gap-8 p-4 rounded-lg">
      {/* Section 1  - Personal Information*/}
      <div className="text-sm">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("personal")}>
          <div className="flex items-center justify-center gap-2">
          <GoPerson className="inline-block rounded-full text-2xl mr-2" />
          <span className="font-serif text-xl">Personal Info</span>
          </div>
                  
                  {openSections.personal ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openSections.personal && (
          <div>
          <div>
          <label className="block mb-2">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
          <div className="flex justify-between items-center gap-4">
            <div className="w-full">
            <label className="block mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
            </div>
            <div className="w-full">
            <label className="block mb-2">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
            </div>
          </div>
          <label className="block mb-2">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
          </div>
  
          <div>
            <div className="mb-2">
            <span className="text-sm mb-2 font-bold">Links</span><span>(1/5)</span>
            </div>
          <div className="flex justify-between items-start gap-4">
            <div className="w-full">
            <input type="url" name="link" value={formData.links.url} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
            </div> 
            <div className="w-full">
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="GitHub">GitHub</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="HackerRank">HackerRank</option>
                <option value="CodeChef">CodeChef</option>
                <option value="LeetCode">LeetCode</option>
                <option value="CodeForces">CodeForces</option>
                <option value="Portfolio">Portfolio</option>
              </select>
            </div>
          </div>
          <button className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add link</button>
          </div>
          </div>
        )}
        
      </div>
      {/* Section 2 - Education */}
      <div className="text-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("education")}>
      <div className="flex items-center justify-center gap-2">
          <LiaBookSolid className="inline-block rounded-full text-2xl mr-2" />
          <span className="font-serif text-xl">Education</span>
          </div>
                  {openSections.education ? <ChevronUp /> : <ChevronDown />}
        </div>
        {/* <div className="text-sm mb-2 font-bold">Education</div> */}
        {openSections.education && (
          <div>
                    <div>
        <label className="block mb-2">University</label>
        <input type="text" name="university" value={formData.education.university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
        <div className="flex justify-between items-center gap-4">
          <div className="w-full">
          <label className="block mb-2">Degree</label>
          <input type="text" name="degree" value={formData.education.degree} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
          <div className="w-full">
          <label className="block mb-2">Location</label>
          <input type="text" name="location" value={formData.education.location} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          
          </div>
        </div>
        <div className="flex justify-end items-end gap-4">
        <div className="w-full">
          <label className="block mb-2">Scores</label>
            <select
              className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="Percentage">Percentage</option>
              <option value="Cgpa">CGPA</option>
            </select>
          </div >
            <div className="w-full">
            {/* <label className="block mb-2">GPA</label> */}
            <input type="text" name="gpa" value={formData.education.gpa} onChange={handleChange} className="w-full p-2 border rounded-lg" />
            </div>
        </div>
        <div className="flex justify-between items-center mt-4 gap-4">
          <div className="w-full">
          <label className="block mb-2">Start Date</label>
          <input type="text" name="duration" value={formData.education.startDate} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
        <div className="w-full">
        <label className="block mb-2">End Date</label>
        <input type="text" name="duration" value={formData.education.endDate} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
        </div>
        
        </div>
        </div>
        <button className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add education</button>
          </div>
        )}
  

      </div>
      {/* Section 3 - Experience */}
      <div className="text-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("experience")}>
      <div className="flex items-center justify-center gap-2">
          <PiBagSimpleLight className="inline-block rounded-full text-2xl mr-2" />
          <span className="font-serif text-xl">Experience</span>
          </div>
                  {openSections.experience ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openSections.experience && (
          <div>
            <div>
        <div className="flex justify-between items-center gap-4">
          <div className="w-full">
          <label className="block mb-2">Company</label>
          <input type="text" name="degree" value={formData.experience.company} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
          <div className="w-full">
          <label className="block mb-2">Role</label>
          <input type="text" name="location" value={formData.experience.role} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div className="w-full">
          <label className="block mb-2">Start Date</label>
          <input type="text" name="duration" value={formData.experience.startDate} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
        <div className="w-full">
        <label className="block mb-2">End Date</label>
        <input type="text" name="duration" value={formData.experience.endDate} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
        </div>
        
        </div>
        <label className="block mb-2">Location</label>
            <input type="text" name="location" value={formData.experience.location} onChange={handleChange} className="w-full p-2 border rounded-lg" />
        <label className="block mt-2 mb-2">Description</label>
        <textarea name="description" value={formData.experience.description} onChange={handleChange} className="w-full p-2 h-24 border rounded-lg mb-4" />
        </div>
        <button className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add Experience</button>
          </div>
        )}
        
      </div>
      {/* Section 4 - Projects */}
      <div className="text-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("projects")}>
      <div className="flex items-center justify-center gap-2">
          <LuProjector className="inline-block rounded-full text-2xl mr-2" />
          <span className="font-serif text-xl">Projects</span>
          </div>
                  {openSections.projects ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openSections.projects && (
          <div>
            <div>
        <label className="block mb-2">Project Name</label>
        <input type="text" name="name" value={formData.projects.name} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
        <label className="block mb-2">Technology Used</label>
        <input type="text" name="techStack" value={formData.projects.techStack} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
        <div className="flex justify-between items-center gap-4">
          <div className="w-full">
          <label className="block mb-2">Live Link</label>
          <input type="url" name="livelink" value={formData.projects.liveLink} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
          <div className="w-full">
          <label className="block mb-2">Repo Link</label>
          <input type="url" name="repolink" value={formData.projects.repoLink} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
        </div>
        <label className="block mt-2 mb-2">Description</label>
        <textarea name="description" value={formData.experience.description} onChange={handleChange} className="w-full p-2 h-24 border rounded-lg mb-4" />
        </div>
        <button className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add Project</button>
          </div>
        )}
        
      </div>
      {/* Section 5 - Skills */}
      <div className="text-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("skills")}>
      <div className="flex items-center justify-center gap-2">
          <PiHandCoinsLight className="inline-block rounded-full text-2xl mr-2" />
          <span className="font-serif text-xl">Skills</span>
          </div>
                  {openSections.skills ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openSections.skills && (
          <div>
          <label className="block mb-2">Programming Languages</label>
          <input type="text" name="university" value={formData.education.university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          <label className="block mb-2">Core competencies</label>
          <input type="text" name="university" value={formData.education.university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          <label className="block mb-2">Framework/Libraries</label>
          <input type="text" name="university" value={formData.education.university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          <label className="block mb-2">Tech Stack</label>
          <input type="text" name="university" value={formData.education.university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          <label className="block mb-2">Developer's Tool</label>
          <input type="text" name="university" value={formData.education.university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          <label className="block mb-2">Additional Skills</label>
          <input type="text" name="university" value={formData.education.university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
        )}
      </div>
      {/* Section 6 - Honors & Awards */}
      <div className="text-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("honors")}>
      <div className="flex items-center justify-center gap-2">
          <SlBadge className="inline-block rounded-full text-2xl mr-2" />
          <span className="font-serif text-xl">Additional</span>
          </div>
                  {openSections.honors ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openSections.honors && (
          <div>
            <div>
        <label className="block mb-2">Honors & Awards</label>
        <input type="text" name="honors" value={formData.honors} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
        </div>
        <button className="p-2 flex justify-center items-center text-md border border-black rounded-lg w-full hover:bg-slate-300 transition-all duration-300">+ Add Honors</button>
          </div>
        )}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Build</button>
      </div>
    </form>
  );
};

export default ResumeForm;



