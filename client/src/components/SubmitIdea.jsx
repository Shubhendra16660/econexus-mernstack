import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubmitIdea() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    problemStatement: "",
    solution: "",
    impact: ""
  });

  const token = localStorage.getItem("token");
  console.log(token);

  // input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      
      [e.target.name]: e.target.value
    });
  };
console.log(formData);

  // submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("FORM DATA:", formData);

  if (
    !formData.title ||
    !formData.description ||
    !formData.category
  ) {
    alert("Please fill all required fields");
    return;
  }

  try {

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:4000/api/ideas",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(res.data);
    navigate("/dashboard/ideas");

  } catch (error) {

    console.log("FULL ERROR:", error);

    console.log(
      "BACKEND ERROR:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      "Submission failed"
    );
  }
};
  return (
    <div className="idea-container">

      <div className="submit-idea-card">

        <h2>Submit Your Idea 🌱</h2>

        <form onSubmit={handleSubmit}>

          <label>Idea Title</label>

          <input
            type="text"
            name="title"
            placeholder="Enter idea title"
            onChange={handleChange}
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Describe your idea"
            onChange={handleChange}
          ></textarea>

          <label>Category</label>

          <select
            name="category"
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Environment">Environment</option>
            <option value="Recycling">Recycling</option>
            <option value="Energy">Energy</option>
          </select>

         

          <button className="submit-btn">
            Submit Idea
          </button>

        </form>

      </div>

    </div>
  );
}

export default SubmitIdea;
