import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  
  links: [
    {
      type: { type: String },
      url: { type: String, required: true }
    }
  ],

  education: [
    {
      university: { type: String, required: true },
      degree: { type: String, required: true },
      gpa: { type: String },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String }
    }
  ],

  experience: [
    {
      company: { type: String, required: true },
      role: { type: String, required: true },
      location: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      description: { type: String }
    }
  ],

  projects: [
    {
      name: { type: String, required: true },
      liveLink: { type: String },
      repoLink: { type: String },
      techStack: { type: String },
      description: { type: String }
    }
  ],

  skills: {
    ProgrammingLanguages: { type: String },
    CoreCompetencies: { type: String },
    Frameworks: { type: String },
    TechStack: { type: String },
    DeveloperTools: { type: String },
    AdditionalSkills: { type: String }
  },

  honors: [{ type: String }],

  template: { type: String} // Template selection (1,2,3)
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
