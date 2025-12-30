export default function Home() {
  const userRole = localStorage.getItem("role");

  return (
    <div>
      <h1>Welcome to the Restaurant Reservation System</h1>
      <p>You are logged in.</p>

      {userRole === "ADMIN" ? (
        <a href="/admin">
          <button>Go to Admin Panel</button>
        </a>
      ) : (
        <a href="/user">
          <button>View My Reservations</button>
        </a>
      )}
    </div>
  );
}
