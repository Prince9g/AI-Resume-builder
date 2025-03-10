import React, { useState } from 'react'

const Personalinfo = () => {
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
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const [selected, setSelected] = useState("LinkedIn");
  return (
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
  )
}

export default Personalinfo
