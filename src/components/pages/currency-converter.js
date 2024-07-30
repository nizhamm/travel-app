import { useState } from "react";
import "./currency-converter.css";

const CurrencyConverter = () => {
  const currentEuroRate = 1.18;
  const [currencyValue, setCurrencyValue] = useState();

  const convertCurrency = (e) => {
    let inputValue = e.target.value;
    let nfObject = new Intl.NumberFormat("en-US");
    inputValue = inputValue * currentEuroRate;
    inputValue = nfObject.format(inputValue?.toFixed(2));
    return setCurrencyValue(inputValue);
  };

  return (
    <>
      <div className="currency-section">
        <span className="euro-format">GBP to Euro Converter:</span>
        <input
          type="text"
          className="form-control"
          placeholder="Enter amount"
          onChange={(e) => convertCurrency(e)}
        />
        <p className="euro-format">Euro : {currencyValue}</p>
      </div>
    </>
  );
};

export default CurrencyConverter;
