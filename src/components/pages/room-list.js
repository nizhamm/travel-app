import Roomlist from "../../assets/data/room-list.json";
import "./room-list.css";
import { useNavigate } from "react-router";

const RoomList = () => {
  const navigate = useNavigate();

  const goToPayment = (id) => {
    navigate("/payment");
    sessionStorage.setItem("roomId", id);
  };
  return (
    <>
      <h2>Select Room</h2>
      <div className="room-container">
        {Roomlist?.map((record) => {
          return (
            <div key={record.id} className="room-card">
              <img
                src={record.icon}
                key={record.id}
                alt=""
                className="cat-img"
                onClick={() => goToPayment(record.id)}
                onKeyDown={() => goToPayment(record.id)}
                tabIndex={0}
              />
              <br />
              <span className="room-select-type">{record.type}</span>
              <ul className="room-list-container">
                <li className="price">
                  Price: {record.price}{" "}
                  <span className="per-night">per night</span>
                </li>
                <li>Max: {record.max}</li>
                <li>View: {record.view}</li>
                <li>Bed: {record.bed}</li>
              </ul>
              <hr />
              <div className="btn-align">
                <button
                  type="button"
                  className="btn btn-success"
                  tabIndex={0}
                  onClick={() => goToPayment(record.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RoomList;
