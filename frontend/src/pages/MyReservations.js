import { useEffect, useState, useRef } from "react";
import API from "../services/api";
import "../styles/BookingSystem.css";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [guests, setGuests] = useState(2);

  // ✅ NEW STATE
  const [mobileNumber, setMobileNumber] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  const [confirmed, setConfirmed] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    API.get("/reservations/my").then(res => setReservations(res.data));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      API.get(`/reservations/booked-slots?date=${selectedDate}`).then(res => setBookedSlots(res.data));
    } else {
      setBookedSlots([]);
    }
  }, [selectedDate]);

  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  const slots = [
    "18:00-18:30","18:30-19:00","19:00-19:30",
    "19:30-20:00","20:00-20:30","20:30-21:00"
  ];

  const bookTable = async () => {
    if (!mobileNumber.trim()) {
      alert("Mobile number is required");
      return;
    }

    try {
      const res = await API.post("/reservations", {
        date: selectedDate,
        timeSlot: selectedSlot,
        guests,
        mobileNumber,
        specialRequest
      });

      setConfirmed(res.data);
      setReservations(prev => [res.data, ...prev]);

      // reset form state
      setMobileNumber("");
      setSpecialRequest("");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to book reservation");
    }
  };

  return (
    <>
      {/* TOP NAV */}
      <div className="top-nav">Booking System</div>

      <div className="booking-container">
        {/* LEFT COLUMN */}
        <div className="left-section">
          <div className="info-card">
            <h2>Ocean View Restaurant</h2>
            <p className="muted">Hyderabad, India</p>
            <p className="muted">Open: 11:00 AM – 11:00 PM</p>
            <span className="status-open">● Open Now</span>

            <div className="action-row">
              <button className="secondary-btn">Get Directions</button>
              <button className="primary-btn">Book a Table</button>
            </div>
          </div>

          <h3 className="section-title">Your Upcoming Reservations</h3>

          <div className="upcoming-card">
            {reservations.length === 0 && (
              <p className="muted">No upcoming reservations</p>
            )}

            {reservations.map(r => (
              <div key={r._id} className="reservation-item">
                <div>{r.date}</div>
                <div>{r.timeSlot}</div>
                <div>{r.guests} Guests</div>
                <div className="muted">📞 {r.mobileNumber}</div>
                {r.specialRequest && (
                  <div className="muted">📝 {r.specialRequest}</div>
                )}
                {r.status === 'cancelled' ? (
                  <span className="badge-cancelled">Cancelled - Contact establishment for details</span>
                ) : (
                  <div className="reservation-actions">
                    <span className="badge-confirmed">Confirmed</span>
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this reservation?')) {
                          API.delete(`/reservations/${r._id}`)
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-card">
          <h3>New Reservation</h3>

          {/* DATE SELECT */}
          <div className="date-row">
            {dates.map(d => (
              <button
                key={d}
                className={selectedDate === d ? "pill active" : "pill"}
                onClick={() => setSelectedDate(d)}
              >
                {d}
              </button>
            ))}
          </div>

          {/* SLOT SELECT */}
          {selectedDate && (
            <>
              <div className="slot-grid">
                {slots.map(s => {
                  const isBooked = bookedSlots.some(slot => slot.timeSlot === s);
                  return (
                    <button
                      key={s}
                      className={`${selectedSlot === s ? "pill active" : "pill"} ${isBooked ? "disabled" : ""}`}
                      onClick={() => {
                        if (!isBooked) {
                          setSelectedSlot(s);
                          setTimeout(() => {
                            formRef.current?.scrollIntoView({ behavior: "smooth" });
                          }, 200);
                        }
                      }}
                      disabled={isBooked}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              <p className="note">
                Table is automatically assigned based on availability
              </p>
            </>
          )}

          {/* FORM */}
          {selectedSlot && !confirmed && (
            <div ref={formRef} className="form-section">
              <h4>Confirm Reservation</h4>

              {/* MOBILE NUMBER */}
              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                className="input"
              />

              {/* GUEST COUNT */}
              <div className="guest-stepper">
                <button onClick={() => setGuests(g => g - 1)}>-</button>
                <span>{guests}</span>
                <button onClick={() => setGuests(g => g + 1)}>+</button>
              </div>

              {/* SPECIAL REQUEST */}
              <textarea
                placeholder="Special requests (optional)"
                value={specialRequest}
                onChange={e => setSpecialRequest(e.target.value)}
                className="textarea"
              />

              <button className="primary-btn" onClick={bookTable}>
                Confirm Reservation
              </button>
            </div>
          )}

          {/* CONFIRMATION */}
          {confirmed && (
            <div className="success-card">
              <h4>Reservation Confirmed</h4>
              <p>{confirmed.date}</p>
              <p>{confirmed.timeSlot}</p>
              <p>{confirmed.guests} Guests</p>
              <p>📞 {confirmed.mobileNumber}</p>
              <small>Table assigned on arrival</small>
              <button
                className="secondary-btn"
                onClick={() => {
                  setSelectedDate("");
                  setSelectedSlot("");
                  setGuests(2);
                  setMobileNumber("");
                  setSpecialRequest("");
                  setConfirmed(null);
                }}
              >
                Book Again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
