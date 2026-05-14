import React, { useEffect, useState } from "react";
import axios from "axios";

function Ideas() {
  const [ideas, setIdeas] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  // 🔹 Fetch all ideas
  const fetchIdeas = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/ideas",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API RESPONSE:", res.data);

      setIdeas(res.data.data || res.data);

    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // 🔹 Approve / Reject Idea
  const handleReview = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/ideas/${id}/review`,
        {
          status,
          feedback: `${status} by admin`,
          score: status === "accepted" ? 9 : 4,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`Idea ${status} successfully ✅`);

      // refresh ideas
      fetchIdeas();

    } catch (error) {
      console.log("REVIEW ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Review failed"
      );
    }
  };

  return (
 <div className="ideas-container">
  <h1>🌱 All Ideas</h1>

  <div className="ideas-grid">
    {ideas.length === 0 ? (
      <p>No ideas found</p>
    ) : (
      ideas.map((idea) => (
        <div className="idea-card" key={idea._id}>

          <h3>{idea.title}</h3>

          <p>
            <strong>Description:</strong>
            {idea.description}
          </p>

          <p>
            <strong>Category:</strong>
            {idea.category}
          </p>

          <p>
            <strong>Status:</strong>

            <span
              className={`status-badge ${idea.status}`}
            >
              {idea.status}
            </span>
          </p>

          {idea.submittedBy && (
            <p className="author">
              <strong>Submitted By:</strong>
              {idea.submittedBy.name}
            </p>
          )}

          {user?.role === "admin" &&
            idea.status === "pending" && (

              <div className="review-buttons">

                <button
                  className="approve-btn"
                  onClick={() =>
                    handleReview(
                      idea._id,
                      "approved"
                    )
                  }
                >
                  ✅ Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    handleReview(
                      idea._id,
                      "rejected"
                    )
                  }
                >
                  ❌ Reject
                </button>

              </div>
          )}

        </div>
      ))
    )}
  </div>
</div>
  );
}

export default Ideas;
    