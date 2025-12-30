import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import "../styles/BookingSystem.css";

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const reservationsListRef = useRef(null);

  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resv = await API.get("/admin/reservations");
    const tbls = await API.get("/admin/tables");

    setReservations(resv.data);
    setTables(tbls.data);

    // Scroll to top to show newest reservations
    if (reservationsListRef.current) {
      reservationsListRef.current.scrollTop = 0;
    }
  };

  const addTable = async () => {
    try {
      await API.post("/admin/tables", {
        tableNumber,
        capacity
      });

      alert("Table added successfully!");
      setTableNumber("");
      setCapacity("");
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add table");
    }
  };

  const bookedTableIds = new Set(
    reservations.filter(r => r.status === 'active').map(r => r.tableId._id)
  );

  const availableTables = tables.filter(
    t => !bookedTableIds.has(t._id)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="top-nav">
        Admin Dashboard
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="booking-container">
        {/* SUMMARY CARDS */}
        <div className="admin-summary">
          <div className="summary-card">
            <h3>Total Tables</h3>
            <p>{tables.length}</p>
          </div>

          <div className="summary-card">
            <h3>Booked Tables</h3>
            <p>{bookedTableIds.size}</p>
          </div>

          <div className="summary-card">
            <h3>Available Tables</h3>
            <p>{availableTables.length}</p>
          </div>
        </div>

        {/* ADD TABLE */}
        <div className="right-card">
          <h3>Add New Table</h3>

          <input
            className="input"
            placeholder="Table Number"
            value={tableNumber}
            onChange={e => setTableNumber(e.target.value)}
          />

          <input
            className="input"
            placeholder="Capacity"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
          />

          <button className="primary-btn" onClick={addTable}>
            Add Table
          </button>
        </div>

        {/* RESERVATIONS */}
        <div className="left-section">
          <h3 className="section-title">All Reservations</h3>

          <div className="reservations-list" ref={reservationsListRef}>
            {reservations.map(r => (
              <div key={r._id} className="reservation-item">
                <div className="reservation-header">
                  <strong>{r.userId.email}</strong>
                  {r.status !== 'cancelled' && (
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this reservation?')) {
                          API.put(`/admin/reservations/${r._id}/cancel`)
                            .then(() => {
                              setReservations(prev => prev.map(res =>
                                res._id === r._id ? { ...res, status: 'cancelled' } : res
                              ));
                            })
                            .catch(error => {
                              alert(error.response?.data?.message || "Failed to cancel reservation");
                            });
                        }
                      }}
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <div>{r.date} | {r.timeSlot}</div>
                <div>Guests: {r.guests}</div>
                <div>📞 {r.mobileNumber}</div>
                <div>Table: {r.tableId.tableNumber}</div>
                {r.status === 'cancelled' && (
                  <span className="badge-cancelled">Cancelled</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
