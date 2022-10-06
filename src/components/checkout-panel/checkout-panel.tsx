import React from 'react';
import Classnames from 'classnames';
import CheckoutPanelView from './checkout/checkout';
import CheckoutConfirmationPanelView from './checkout-confirmation/checkout-confirmation';
import { selectCheckoutIsSide, selectOffer } from '../../slices/checkout-slice';
import { useAppSelector } from '../../hooks';

import './checkout-panel.less';

export const CheckoutPanel: React.FC = (): React.ReactElement => {
    const selectedOffer = useAppSelector(selectOffer);
    const isCheckoutPanelSide = useAppSelector(selectCheckoutIsSide),
        classes: string = Classnames(
            `checkout-panel`,
            { 'checkout-panel--side': isCheckoutPanelSide },
            { 'checkout-panel--bottom': !isCheckoutPanelSide },
        );
    console.log(selectedOffer);
    return (
        <>
            <section className={classes}>
                <CheckoutPanelView selectedOffer={selectedOffer} />
                <CheckoutConfirmationPanelView />
            </section>
        </>
    );
};
