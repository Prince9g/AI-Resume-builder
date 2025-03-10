import React, { useState } from "react";
import { GoPerson } from "react-icons/go";
import { LiaBookSolid } from "react-icons/lia";
import { PiBagSimpleLight, PiHandCoinsLight } from "react-icons/pi";
import { LuProjector } from "react-icons/lu";
import { SlBadge } from "react-icons/sl";
import { ChevronDown, ChevronUp } from "lucide-react";

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    links: [{ type: "", url: "" }],
    education: [{ university: "", degree: "", gpa: "", location: "", startDate: "", endDate: "" }],
    experience: [{ company: "", role: "", location: "", startDate: "", endDate: "", description: "" }],
    projects: [{ name: "", liveLink: "", repoLink: "", techStack: "", description: "" }],
    skills: { ProgrammingLanguages: "", CoreCompetencies: "", Frameworks: "", TechStack: "", DeveloperTools: "", AdditionalSkills: "" },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Resume Details</h2>
      
      {/* Personal Info */}
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("personal")}>
          <span className="font-bold text-sm"><GoPerson className="inline-block mr-2" />Personal Info</span>
          {openSections.personal ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openSections.personal && (
          <div className="mt-2">
            <label className="block mb-2">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
            <label className="block mb-2">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
            <label className="block mb-2">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
            <label className="block mb-2">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
          </div>
        )}
      </div>

      {/* Education */}
      <div className="mb-4">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection("education")}>
          <span className="font-bold text-sm"><LiaBookSolid className="inline-block mr-2" />Education</span>
          {openSections.education ? <ChevronUp /> : <ChevronDown />}
        </div>
        {openSections.education && (
          <div className="mt-2">
            <label className="block mb-2">University</label>
            <input type="text" name="university" value={formData.education[0].university} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div>
        )}
      </div>
      
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default ResumeForm;
