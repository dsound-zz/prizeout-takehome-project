import React from 'react';
import PropTypes from 'prop-types';
import { useAppSelector } from '../../../hooks';
import checkoutPanelViewWrapper, { SetViewProps } from '../view-wrapper';
import { selectOffer } from '../../../slices/checkout-slice';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import './checkout-confirmation.less';

type CheckoutConfirmationProps = {
    setView?: (item: string) => void;
    submittedOffer: PrizeoutOfferValueOptions;
    reset?: () => void;
};

// The following values are required by the checkout endpoint: `checkout_value_id`, `cost_in_cents`, `name`, `value_in_cents`.

const CheckoutConfirmationPanelView = ({
    setView,
    submittedOffer,
    reset,
}: CheckoutConfirmationProps): React.ReactElement => {
    const selectedOffer = useAppSelector(selectOffer);

    const checkoutMessage = () => {
        const giftTotal = (submittedOffer?.value_in_cents / 100).toString();

        return `$${giftTotal} has been added to your ${selectedOffer?.name} card!`;
    };

    return (
        <section className="checkout-confirmation">
            <h2>Congratulations!</h2>
            <div className="checkout-confirmation__message">{checkoutMessage()}</div>
            <button
                className="checkout-confirmation__done"
                onClick={() => {
                    setView('checkout');
                    reset();
                }}
            >
                Done
            </button>
        </section>
    );
};

CheckoutConfirmationPanelView.propTypes = {
    setView: PropTypes.func,
};

export default checkoutPanelViewWrapper(CheckoutConfirmationPanelView, 'checkout-confirmation');
