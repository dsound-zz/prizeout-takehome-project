import React, { useState } from 'react';
import { Button } from '../../common';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import { setOffer, setCheckoutView, setSubmitted } from '../../../slices/checkout-slice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

type CheckoutButtonProps = {
    selectedGiftOffer: PrizeoutOfferValueOptions;
};

import './checkout-button.less';

const CheckoutButton = ({ selectedGiftOffer }: CheckoutButtonProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const buttonText = 'Prizeout Gift Card';
    const buttonHandler = () => {
        dispatch(setOffer(selectedGiftOffer));
        dispatch(setCheckoutView('checkout-confirmation'));
        dispatch(setSubmitted(true));
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`confirm`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
