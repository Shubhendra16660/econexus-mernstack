
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h2>EcoNexus Dashboard</h2>

      <nav>
        <Link to="/dashboard">Home</Link> |
        <Link to="/submit">Submit Idea</Link>
        <Link to="/dashboard/ideas">View Ideas</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </nav>

      <hr />

      <Outlet /> {/* yaha pages render honge */}
    </div>
  );
}

export default Dashboard;