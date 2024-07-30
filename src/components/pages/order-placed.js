import { useEffect, useState } from "react";
import { dateFormatter } from "../common/util";
import "./order-placed.css";

const OrderPlaced = (props) => {
  const [selectedInfo, setSelectedInfo] = useState();

  useEffect(() => {
    const fullSelectedData = sessionStorage.getItem("userSelection");
    setSelectedInfo(JSON.parse(fullSelectedData));
  }, []);
  return (
    <>
      <div className="order-container">
        <div className="row row-container">
          <h3>Congratulations! Your order has been placed successfully!</h3>
          <div className="col text-num">Your transaction id #123-456-789</div>
        </div>
        <div className="row row-container">
          <div className="col">
            <h4>Travel details</h4>
            <table className="table booking-table">
              <tbody>
                <tr>
                  <th scope="row">Place to Travel:</th>
                  <td>{selectedInfo?.selectedePlace}</td>
                </tr>
                <tr>
                  <th scope="row">Number of Person:</th>
                  <td>{selectedInfo?.selectedPerson}</td>
                </tr>
                <tr>
                  <th scope="row">Number of Room:</th>
                  <td>{selectedInfo?.selectedRoom}</td>
                </tr>
                <tr>
                  <th scope="row">Check-in Date:</th>
                  <td>{dateFormatter(selectedInfo?.selectedStartDate)}</td>
                </tr>
                <tr>
                  <th scope="row">Checkout Date:</th>
                  <td>{dateFormatter(selectedInfo?.selectedEndDate)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPlaced;
