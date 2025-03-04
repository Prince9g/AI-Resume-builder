import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  summary: { type: String },
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startYear: String,
      endYear: String,
    },
  ],
  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String,
    },
  ],
  skills: [String],
  template: { type: String, required: true }, // Template selection (1,2,3)
});

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
