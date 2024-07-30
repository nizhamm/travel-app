import { useEffect, useState } from "react";
import roomlist from "../../assets/data/room-list.json";
import "./room-payment.css";
import CurrencyConverter from "./currency-converter";
import PaymentMethod from "./payment-method";
import { callSecondAPI } from "../hooks/bill-pay";
import { dateFormatter } from "../common/util";

const Roompayment = () => {
  const [userRoomDetail, setUserRoomDetail] = useState();
  const [userBookingData, setUserBookingData] = useState();
  const [cusomerDataStatus, getCustomerDataStatus] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState();
  const [payMethod, setPaymMethod] = useState();  

  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("roomId")) {
      let userID = JSON.parse(sessionStorage?.roomId);
      let userRoom = null;
      for (let key in roomlist) {
        if (roomlist[key].id === userID) {
          userRoom = roomlist[key];
          setUserRoomDetail(userRoom);
          setUserBookingData(JSON.parse(sessionStorage.userSelection));
        }
      }
    }
  }, []);

  const roomTotalVal = () => {
    let totalRoomPrice;
    const noOfRooms = parseInt(userBookingData?.selectedRoom);
    const perRoomPrice = parseInt(userRoomDetail?.price?.substring(1));
    totalRoomPrice = perRoomPrice * noOfRooms;
    totalRoomPrice = totalRoomPrice * numberOfDays;
    return totalRoomPrice;
  };

  const roomTotalAfterDiscout = () => {
    let totalPrice = roomTotalVal();
    totalPrice = totalPrice - totalPrice * 0.2;
    return totalPrice;
  };

  const discountAmt = () => {
    // let discountPrice = parseInt(userRoomDetail?.price?.substring(1));
    let discountPrice = roomTotalVal();
    discountPrice = discountPrice * 0.2;
    return discountPrice;
  };

  useEffect(() => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const startDate = new Date(userBookingData?.selectedStartDate);
    const endDate = new Date(userBookingData?.selectedEndDate);
    const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    setNumberOfDays(diffDays);
  }, [userBookingData]);

  useEffect(() => {
    if (
      payMethod?.currentSelect === "card" ||
      payMethod?.currentSelect === "netbanking"
    ) {
      getCustomerDataStatus(false)
    }
  }, [payMethod]);

  return (
    <>
      <p className="heading-summary">Booking Summary</p>
      <div className="payment-container">
        <div className="row">
          <div className="col payment-grid">
            <form className="">
              <div className="heading-style">Who's checking in?</div>
              <div className="row">
                <div className="col">
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First name"
                  />
                </div>
                <div className="col">
                  <label>Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last name"
                  />
                </div>
                <div className="">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="">
                  <label>Phone Nmber</label>
                  <input
                    type="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="col order-2 payment-grid">
            <div>
              <span className="heading-style">Booking Details</span>
              <table className="table booking-table">
                <tbody>
                  <tr>
                    <th scope="row">Place to Travel:</th>
                    <td>{userBookingData?.selectedePlace}</td>
                  </tr>
                  <tr>
                    <th scope="row">Number of Person:</th>
                    <td>{userBookingData?.selectedPerson}</td>
                  </tr>
                  <tr>
                    <th scope="row">Number of Room:</th>
                    <td>{userBookingData?.selectedRoom}</td>
                  </tr>
                  <tr>
                    <th scope="row">Check-in Date:</th>
                    <td>{dateFormatter(userBookingData?.selectedStartDate)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Checkout Date:</th>
                    <td>{dateFormatter(userBookingData?.selectedEndDate)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-container">
        <div className="row">
          <div className="col payment-grid">
            <PaymentMethod
              setStatus={getCustomerDataStatus}
              setPaymMethod={setPaymMethod}
            />
          </div>

          <div className="col order-2 payment-grid">
            <div>
              <span className="heading-style">Price and Offer Details</span>
              <p className="nat-scope">
                Exclusive offers with Payit wallet, get e-voucher.{" "}
                <a href="#0">Explore more</a>
              </p>
              <CurrencyConverter />
              <table className="table booking-table">
                <tbody>
                  <tr>
                    <th scope="row">Price:</th>
                    <td>{`£${roomTotalVal()}`}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="th-size">
                      Discount:{" "}
                      {cusomerDataStatus && (
                        <span className="discount-text">
                          Hurray! 20% discount applied!
                        </span>
                      )}
                    </th>
                    <td className="price-style">
                      {cusomerDataStatus ? `£${discountAmt()}` : "£00.00"}
                    </td>
                  </tr>
                  <tr className="total-style">
                    <th scope="row">Total</th>
                    <td>
                      {cusomerDataStatus
                        ? `£${roomTotalAfterDiscout()}`
                        : `£${roomTotalVal()}`}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="container-complete">
                <button
                  type="button"
                  className="btn btn-success btn-complete"
                  tabIndex={0}
                  onClick={callSecondAPI}
                >
                  Make Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roompayment;
