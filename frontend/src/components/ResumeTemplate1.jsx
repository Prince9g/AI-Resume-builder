import React from "react";

const ResumeTemplate1 = ({ formData }) => {
  const { name, email, phone, address, links, education, experience, projects, skills, honors } = formData;

  // Function to format description with bullet points
  const formatDescription = (description) => {
    if (!description) return null;
    return description.split("\n").map((line, index) => {
      if (line.startsWith("-")) {
        return <li key={index}>{line.replace("-", "•")}</li>;
      }
      return <li key={index}>{line}</li>;
    });
  };

  // Check if the form has any data (excluding the name)
  const hasData =
    email ||
    phone ||
    address ||
    links.some((link) => link.type || link.url) ||
    education.some((edu) => edu.university || edu.degree || edu.gpa || edu.location || edu.startDate || edu.endDate) ||
    experience.some((exp) => exp.company || exp.role || exp.location || exp.startDate || exp.endDate || exp.description) ||
    projects.some((project) => project.name || project.liveLink || project.repoLink || project.techStack || project.description) ||
    skills.some((skill) => skill.ProgrammingLanguages || skill.CoreCompetencies || skill.Frameworks || skill.TechStack || skill.DeveloperTools || skill.AdditionalSkills) ||
    honors.some((honor) => honor);

  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white shadow-lg border border-gray-300 relative list-disc text-lg">
      {/* Header */}
      <div className="text-center pb-2">
        <h1 className="text-3xl font-bold">{name || "First Last"}</h1>

        {/* Show additional details only if data exists */}
        {hasData && (
          <>
            <p className="text-sm text-gray-600">
              {email && `${email} | `}
              {phone && `${phone} | `}
              {address}
            </p>
            <p className="text-sm font-semibold mt-2">
              {links.map(
                (link, index) =>
                  link.type &&
                  link.url && (
                    <span key={index} className="text-black">
                      <span className="mr-1">{index !== 0 && " | "}</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.type}
                      </a>{" "}
                    </span>
                  )
              )}
            </p>
          </>
        )}
      </div>

      {/* Education Section */}
      {education.some((edu) => edu.university || edu.degree || edu.gpa || edu.location || edu.startDate || edu.endDate) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Education</h2>
          {education.map(
            (edu, index) =>
              (edu.university || edu.degree || edu.gpa || edu.location || edu.startDate || edu.endDate) && (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{edu.university}</p>
                    <p className="text-sm">{edu.location}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm italic">
                      {edu.degree} {edu.gpa && `GPA: ${edu.gpa}`}
                    </p>
                    <p className="text-sm">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Experience Section */}
      {experience.some((exp) => exp.company || exp.role || exp.location || exp.startDate || exp.endDate || exp.description) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Experience</h2>
          {experience.map(
            (exp, index) =>
              (exp.company || exp.role || exp.location || exp.startDate || exp.endDate || exp.description) && (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">
                      {exp.company} | {exp.role}
                    </p>
                    <p className="text-sm text-gray-600">
                      {exp.location} | {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {formatDescription(exp.description)}
                  </ul>
                </div>
              )
          )}
        </div>
      )}

      {/* Projects Section */}
      {projects.some((project) => project.name || project.liveLink || project.repoLink || project.techStack || project.description) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Projects</h2>
          {projects.map(
            (project, index) =>
              (project.name || project.liveLink || project.repoLink || project.techStack || project.description) && (
                <div key={index}>
                  <div className="flex justify-between">
                    <p className="font-semibold">
                      {project.name}{" "}
                      {project.liveLink && (
                        <span className="text-blue-600">
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            Live Link
                          </a>
                        </span>
                      )}{" "}
                      |{" "}
                      {project.repoLink && (
                        <span className="text-blue-600">
                          <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                            Repo Link
                          </a>
                        </span>
                      )}
                    </p>
                    <p className="text-sm">{project.techStack}</p>
                  </div>
                  <ul className="list-disc pl-5 text-sm">
                    {formatDescription(project.description)}
                  </ul>
                </div>
              )
          )}
        </div>
      )}

      {/* Skills Section */}
      {skills.some((skill) => skill.ProgrammingLanguages || skill.CoreCompetencies || skill.Frameworks || skill.TechStack || skill.DeveloperTools || skill.AdditionalSkills) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Skills</h2>
          {skills.map(
            (skill, index) =>
              (skill.ProgrammingLanguages || skill.CoreCompetencies || skill.Frameworks || skill.TechStack || skill.DeveloperTools || skill.AdditionalSkills) && (
                <div key={index}>
                  <p className="text-sm">
                    <strong>Programming Languages: </strong>
                    {skill.ProgrammingLanguages}
                  </p>
                  <p className="text-sm">
                    <strong>Core competencies: </strong>
                    {skill.CoreCompetencies}
                  </p>
                  <p className="text-sm">
                    <strong>Frameworks/Libraries: </strong>
                    {skill.Frameworks}
                  </p>
                  <p className="text-sm">
                    <strong>Tech Stack: </strong>
                    {skill.TechStack}
                  </p>
                  <p className="text-sm">
                    <strong>Developers' Tool: </strong>
                    {skill.DeveloperTools}
                  </p>
                  <p className="text-sm">
                    <strong>Additional Skills: </strong>
                    {skill.AdditionalSkills}
                  </p>
                </div>
              )
          )}
        </div>
      )}

      {/* Honors & Awards Section */}
      {honors.some((honor) => honor) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Honors & Awards</h2>
          <ul className="list-disc pl-5 text-sm">
            {honors.map(
              (honor, index) =>
                honor && <li key={index}>{honor}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplate1;