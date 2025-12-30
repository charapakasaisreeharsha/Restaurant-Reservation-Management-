import "../App.css";

export default function Home() {
  const userRole = localStorage.getItem("role");

  return (
    <div className="home-container">
      <h1>Welcome to the Restaurant Reservation System</h1>
      <p>You are logged in.</p>

      <div className="home-buttons">
        {userRole === "ADMIN" ? (
          <a href="/admin" className="btn-secondary">
            Go to Admin Panel
          </a>
        ) : (
          <a href="/user" className="btn-secondary">
            View My Reservations
          </a>
        )}
      </div>
    </div>
  );
}
