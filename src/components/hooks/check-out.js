import axios from "axios";

export const checkOutPayment = () => {
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
      checkOutPaymentFinal(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const checkOutPaymentFinal = (resp) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${resp?.access_token}`,
  };

  axios
    .get(
      "http://localhost:3000/payment/zerocode/bankofapis.com/customer-checkout/v3/attributes/ecommerce-checkout",
      {
        headers: headers,
      },
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
