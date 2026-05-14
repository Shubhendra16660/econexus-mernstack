import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Fetch all ideas
  const fetchIdeas = async () => {

    try {

      const res = await axios.get(
        "http://localhost:4000/api/ideas",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);

      setIdeas(res.data.data);

    } catch (error) {

      console.log("FETCH ERROR:", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  // Review idea
  const handleReview = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:4000/api/ideas/${id}/review`,
        {
          status,
          feedback: `${status} by admin`,
          score: status === "accepted" ? 9 : 4
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert(`Idea ${status} successfully`);

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
    <div className="admin-container">

      <h1 className="admin-title">
        🌟 Admin Dashboard
      </h1>

      {loading ? (

        <p>Loading ideas...</p>

      ) : ideas.length === 0 ? (

        <p>No ideas found</p>

      ) : (

        Array.isArray(ideas) &&
        ideas.map((idea) => (

          <div
            className="admin-card"
            key={idea._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              background: "#fff"
            }}
          >

            <h2>{idea.title}</h2>

            <p>
              <strong>Description:</strong>{" "}
              {idea.description}
            </p>

            <p>
              <strong>Category:</strong>{" "}
              {idea.category}
            </p>

            <p>
              <strong>Status:</strong>{" "}

              <span
                style={{
                  color:
                    idea.status === "accepted"
                      ? "green"
                      : idea.status === "rejected"
                      ? "red"
                      : "orange",
                  fontWeight: "bold"
                }}
              >
                {idea.status}
              </span>
            </p>

            {idea.submittedBy && (
              <p>
                <strong>Submitted By:</strong>{" "}
                {idea.submittedBy.name}
              </p>
            )}

            {/* Buttons only for pending ideas */}
            {idea.status === "pending" && (

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px"
                }}
              >

                <button
                  onClick={() =>
                    handleReview(
                      idea._id,
                      "accepted"
                    )
                  }
                  style={{
                    background: "green",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  ✅ Approve
                </button>

                <button
                  onClick={() =>
                    handleReview(
                      idea._id,
                      "rejected"
                    )
                  }
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  ❌ Reject
                </button>

              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;