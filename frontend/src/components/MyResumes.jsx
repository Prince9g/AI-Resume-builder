import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { FaTrash, FaDownload } from "react-icons/fa";
import resume1 from "../assets/t1.png"
const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/resume/user-resumes", {
          withCredentials: true,
        });
        setResumes(res.data.resumes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResumes();
  }, []);

  // Open modal with selected resume
  const openModal = (resume) => setSelectedResume(resume);
  const closeModal = () => setSelectedResume(null);

  return (
    <div className="flex flex-wrap gap-5 justify-center">
      {resumes.map((resume) => (
        <div key={resume._id} className="relative group">
          {/* Resume Thumbnail */}
          <img
            src={resume1}  // Placeholder image
            alt="Resume"
            className="w-40 h-52 rounded-md shadow-lg cursor-pointer"
            onClick={() => openModal(resume)}
          />

          {/* Hover Actions */}
          <div className="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 transition duration-500">
            <button
              className="text-white p-2 m-1 bg-red-500 rounded"
              onClick={() => handleDelete(resume._id)}
            >
              <FaTrash />
            </button>
            <button
              className="text-white p-2 m-1 bg-blue-500 rounded"
              onClick={() => handleDownload(resume)}
            >
              <FaDownload />
            </button>
          </div>
        </div>
      ))}

      {/* Modal to View Resume */}
      {selectedResume && (
        <Modal isOpen={true} onRequestClose={closeModal} className="modal">
          <div className="p-5">
            <h2 className="text-lg font-bold">{selectedResume.name}'s Resume</h2>
            <pre className="mt-2">{JSON.stringify(selectedResume, null, 2)}</pre>
            <button className="mt-3 bg-red-500 text-white px-4 py-2" onClick={closeModal}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default MyResumes;
