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
    education: [{ university: "", degree: "", gpa: "", location: "", duration: "" }],
    experience: [{ company: "", role: "", location: "", duration: "", description: "" }],
    projects: [{ name: "", liveLink: "", repoLink: "", techStack: "", description: "" }],
    skills: [{ProgrammingLanguages: "", CoreCompetencies: "", Frameworks: "", TechStack:"",DeveloperTools:"", AdditionalSkills: ""}],
    honors: ""
  });

  const [selected, setSelected] = useState("LinkedIn");

  const sections = [{
    title: "Personal Info",
    fields: ["name", "email", "phone", "address", "links"]
  },
  {
    title: "Education",
    fields: ["university", "degree", "gpa", "location", "duration"]
  },
  {
    title: "Experience",
    fields: ["company", "role", "location", "duration", "description"]
  },
  {
    title: "Projects",
    fields: ["name", "liveLink", "repoLink", "techStack", "description"]
  },
  {
    title: "Skills",
    fields: ["ProgrammingLanguages", "CoreCompetencies", "Frameworks", "TechStack", "DeveloperTools", "AdditionalSkills"]
  },
  {
    title: "Honors & Awards",
    fields: ["honors"],
  }
];


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
      {/* Section 1  */}
      <div className="text-sm">
        <div>
        <div className="text-sm mb-2 font-bold">Personal Info</div>
        <label className="block mb-2">Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
        <div className="flex justify-between items-center gap-4">
          <div>
          <label className="block mb-2">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" required />
          </div>
          <div>
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
        <div className="flex justify-center items-start gap-4">
          <div>
          <input type="url" name="link" value={formData.links.url} onChange={handleChange} className="w-full p-2 border rounded-lg mb-4" />
          </div> 
          <div>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-48 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
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
      
      <label className="block mb-2">Skills</label>
      <textarea name="skills" value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
      
      <label className="block mb-2">Honors & Awards</label>
      <textarea name="honors" value={formData.honors} onChange={handleChange} className="w-full p-2 border rounded mb-4" />
      
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
};

export default ResumeForm;

// personal infor 
{/* <GoPerson className="inline-block mr-2" /> */}

// education
{/* <LiaBookSolid className="inline-block mr-2" /> */}
// experience
{/* <PiBagSimpleLight className="inline-block mr-2" /> */}

//skills 
{/* <PiHandCoinsLight className="inline-block mr-2" /> */}
// projects
{/* <LuProjector className="inline-block mr-2" /> */}
// honors
{/* <SlBadge className="inline-block mr-2" /> */}




