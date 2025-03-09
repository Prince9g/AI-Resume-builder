import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const sections = [
  { title: "Personal Info", fields: ["Full Name", "Email", "Phone", "Address", "Links"] },
  { title: "Education", fields: ["University", "Degree", "GPA", "Location", "Duration"] },
  { title: "Experience", fields: ["Company", "Role", "Location", "Duration", "Description"] },
  { title: "Projects", fields: ["Name", "Live Link", "Repo Link", "Tech Stack", "Description"] },
  { title: "Skills", fields: ["Programming Languages", "Core Competencies", "Frameworks", "Tech Stack", "Developer Tools", "Additional Skills"] },
  { title: "Honors & Awards", fields: ["Honors"] },
];

export default function ResumeForm() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({}); // Store input data

  // Toggle section
  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Handle input change
  const handleInputChange = (sectionTitle, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [sectionTitle]: { ...(prev[sectionTitle] || {}), [field]: value },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-6">Resume Builder</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="border-b pb-3">
            <button
              type="button"
              onClick={() => toggleSection(index)}
              className="flex justify-between items-center w-full text-lg font-semibold py-3 transition-all duration-300">
              {section.title}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>

            {/* Input fields when section is open */}
            {openIndex === index && (
              <div className="mt-2 space-y-3 transition-all duration-300">
                {section.fields.map((field, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium">{field}</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={formData[section.title]?.[field] || ""}
                      onChange={(e) => handleInputChange(section.title, field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
}
