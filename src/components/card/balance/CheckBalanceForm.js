// Node Modules
import PropTypes from 'prop-types';
import React, { useState } from 'react';

//Contexts
import {useContentContext} from "src/context/ContentContextV2";

const propTypes = {
}

const CardBalanceForm = () => {

  const content = useContentContext();

  const {
    cardBalanceHeader="",
    cardNumberPlaceholder="",
    cardNumberLabel= "",
    checkBalanceButtonText="",
    preFetchedBalanceText="",
    giftCardDisclaimerText="",
    pinLabel="",
    pinPlaceholder="",
    yourBalanceText="",
  } = content.content || {};

  const [form, setForm] = useState({
    inputValues: {
      cardNumber: "",
      pin: "",
      formPopulated: false,
    },
    errors: {
      cardNumber: "",
      pin: "",
    }
  });

  const [cardBalance, setCardBalance] = useState("");

  const onChange = e => {
    e.preventDefault();

    const {
      id,
      value
    } = e.target;

    setForm({
      ...form,
      inputValues: {
        ...form.inputValues,
        [id]: value,
      }
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log(form)
  };


  return (
    <div className="card-balance-form-container">
      <h1>{cardBalanceHeader}</h1>
      <div className="balance-wrapper">
        <h3>{yourBalanceText}:</h3>
        <p>{cardBalance.length === 0 ? cardBalance : preFetchedBalanceText}</p>
      </div>
      <form id="cardBalanceForm" onSubmit={onSubmit}>
        <label for="cardNumber">{cardNumberLabel}</label>
        <input
          type="number"
          id="cardNumber"
          name="cardNumber"
          value={form.inputValues.cardNumber}
          placeholder={cardNumberPlaceholder}
          aria-label="Card Number Input"
          maxlength="10"
          onChange={onChange}/>
        <label htmlFor="cardNumber">{pinLabel}</label>
        <input
          type="number"
          id="pin"
          name="pin"
          value={form.inputValues.pin}
          placeholder={pinPlaceholder}
          aria-label="Pin Number Input"
          maxlength="4"
          onChange={onChange}/>
        <button type="submit" onClick={onSubmit}>{checkBalanceButtonText}</button>
      </form>
      <p className="disclaimer-text">{giftCardDisclaimerText}</p>
    </div>
  )
};

CardBalanceForm.propTypes = propTypes;

export default CardBalanceForm;