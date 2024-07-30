import axios from "axios";

export const billPay = () => {
  fetch("http://localhost:3000/well-known/openid-configuration", {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((data) => {
      if (data) callSecondAPI();
    })
    .catch((error) => console.log(error));
};

export const callSecondAPI = () => {  
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
    Accept: "*/*",
  };
  const payload = {
    grant_type: "client_credentials",
    client_id: "EFNLBCtkVHyOsHA3gG2arJSk7UxQcaMqawRsJLaijSg=",
    client_secret: "wiLcLSi_1reVZkDx_NkSCNOA2oSgx9DV-jBvf_qQ4QY=",
    scope: "accounts",
  };

  axios
    .post("http://localhost:3000/token", payload, {
      headers: headers,
    })
    .then((response) => {      
      const { data } = response;
      callThirdAPI(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const callThirdAPI = (resp) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${resp?.access_token}`,
  };
  const payload = {
    Data: {
      Permissions: [
        "ReadAccountsDetail",
        "ReadBalances",
        "ReadTransactionsCredits",
        "ReadTransactionsDebits",
        "ReadTransactionsDetail",
        "ReadCreditScore",
        "SharePersonalInfo",
        "ShareIncomeInfo",
        "ManageCards",
        "NWGOpenAccount",
        "VerifyMortgageAffordability",
        "ShareWealthInfo",
        "BillPayService",
        "ReportFraud",
      ],
    },
    Risk: {},
  };

  axios
    .post(
      "http://localhost:3000/open-banking/v3.1/aisp/account-access-consents",
      JSON.stringify(payload),
      {
        headers: headers,
      },
    )
    .then((response) => {
      const { data } = response;
      let consentId = data?.Data?.ConsentId;
      callFourthAPI(consentId);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const callFourthAPI = (consentId) => {
  axios
    .get(
      `http://localhost:3000?client_id=EFNLBCtkVHyOsHA3gG2arJSk7UxQcaMqawRsJLaijSg=&response_type=code id_token&scope=openid accounts&redirect_uri=https%3A%2F%2Fa8f8e17c-b6f5-4fa4-964b-8637492069c1.example.org%2Fredirect
&state=ABC&request=${consentId}&authorization_mode=AUTO_POSTMAN&authorization_username=123456789012@a8f8e17c-b6f5-4fa4-964b-8637492069c1.example.org`,
    )
    .then((response) => {
      console.log(response);
      sessionStorage.setItem("checkoutStatus", response?.status);
      window.location.href = "http://localhost:3000/success";
    })
    .catch((error) => {
      console.log(error);
    });
};
