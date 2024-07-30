import { useState } from "react";
import payit from "../../assets/payit.png";
import axios from "axios";
import "./payment-method.css";

const PaymentMethod = (props) => {
  const { setStatus, setPaymMethod } = props;
  const [item, setItem] = useState({ currentSelect: "wallet" });
  const [customerData, setCustomerData] = useState();
  const [spinLoading, setSpinLoading] = useState(false);
  const { currentSelect } = item;

  const handleChange = (e) => {
    e.persist();
    setItem({ currentSelect: e.target.value });

    setItem((prevState) => ({
      ...prevState,
      currentSelect: e.target.value,
    }));
    setPaymMethod({ currentSelect: e.target.value });
    setPaymMethod((prevState) => ({
      ...prevState,
      currentSelect: e.target.value,
    }));
  };

  const getCustomerInfo = () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      Accept: "*/*",
    };
    const payload = {
      grant_type: "client_credentials",
      client_id: "EFNLBCtkVHyOsHA3gG2arJSk7UxQcaMqawRsJLaijSg=",
      client_secret: "wiLcLSi_1reVZkDx_NkSCNOA2oSgx9DV-jBvf_qQ4QY=",
    };

    axios
      .post("http://localhost:3000/token", payload, {
        headers: headers,
      })
      .then((response) => {
        const { data } = response;
        callCustmerSecondAPI(data);
      });
  };

  const callCustmerSecondAPI = (resp) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${resp?.access_token}`,
    };

    axios
      .get(
        "http://localhost:3000/zerocode/globalopenfinancechallenge.com/customer/v2/customers/1122334455?idScheme=customerIdentificationNumber",
        {
          headers: headers,
        },
      )
      .then((response) => {
        console.log(response);
        setCustomerData(response?.data);
        setStatus(true);
        setSpinLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetCustomerDetail = () => {
    setSpinLoading(true);
    getCustomerInfo();
  };

  return (
    <>
      <form className="">
        <div className="heading-style">Payment Method</div>
        <div className="row">
          <div className="radiobtn-container">
            <form controlId="currentSelect">
              <div className="form-check">
                <input
                  className="form-check-input"
                  value="wallet"
                  type="radio"
                  aria-label="Payit Wallter"
                  label="wallet"
                  onChange={handleChange}
                  checked={currentSelect === "wallet"}
                />
                <label className="form-check-label">
                  Pay with NatWest Payit{" "}
                  <span className="earn-more">
                    Earn more reward points with Payit!
                  </span>
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  value="netbanking"
                  type="radio"
                  aria-label="netbanking"
                  label="netbanking"
                  onChange={handleChange}
                  checked={currentSelect === "netbanking"}
                />
                <label className="form-check-label">Netbanking</label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  value="card"
                  type="radio"
                  aria-label="card"
                  label="card"
                  onChange={handleChange}
                  checked={currentSelect === "card"}
                />
                <label className="form-check-label">
                  Debit Card / Credit Card
                </label>
              </div>
            </form>
          </div>
          <hr />

          {currentSelect === "wallet" && (
            <div className="payit-container">
              <p className="para-head">
                <u>Pay with NatWest Payit:</u>
              </p>
              <p className="nat-scope">
                Use NatWest Payit wallet, get e-voucher and redeem for your
                e-vehicles drive
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="Enter 12 digit number"
              />
              <img
                src={payit}
                alt="payit"
                className="payit-style"
                tabIndex={0}
                onClick={fetCustomerDetail}
                onKeyDown={fetCustomerDetail}
              />
              {spinLoading && (
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              )}
              {customerData && (
                <div className="customer-info">
                  <ul>
                    <li>Name: {customerData?.data?.name?.fullLegalName}</li>
                    <li>
                      {" "}
                      Phone:{" "}
                      {customerData?.data?.contactDetails?.mobilePhoneNumber}
                    </li>
                    <li>
                      Email: {customerData?.data?.contactDetails?.emailAddress}
                    </li>
                    <li>Wallet: £5000</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {currentSelect === "netbanking" && (
            <div className="net-container">
              <p className="para-head">Pay with Netbanking</p>
              <select class="form-select" aria-label="Default select example">
                <option selected>Select Bank</option>
                <option value="1">NatWest</option>
                <option value="2">HSBC</option>
                <option value="3">American Express</option>
              </select>
            </div>
          )}

          {currentSelect === "card" && (
            <div>
              <div className="col">
                <p className="para-head">Pay with Debit Card/Credit Card:</p>
                <label>Name of the Card</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name of the card"
                />
              </div>

              <div className="">
                <label>Debit/Credit Card number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter card number"
                />
              </div>
              <div className="">
                <label>Security Code</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter CVV number"
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default PaymentMethod;
