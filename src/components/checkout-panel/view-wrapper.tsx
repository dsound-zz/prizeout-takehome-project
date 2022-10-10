import React from 'react';
import Classnames from 'classnames';
import { useAppSelector } from '../../hooks';
import {
    selectLoading,
    selectCheckoutIsSide,
    selectCheckoutView,
    setCheckoutView,
    ViewEnum,
    selectOffer,
    submitOffer,
    resetCheckout,
    setSubmitted,
} from '../../slices/checkout-slice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { PrizeoutOfferSettings, resetOffers } from '../../slices/offers-slice';

export interface SetViewProps {
    isSide: boolean;
    isVisible: boolean;
    setView: (view: ViewEnum) => void;
    selectedOffer: PrizeoutOfferSettings;
    submittedOffer: () => void;
    reset: () => void;
}

export function checkoutPanelViewWrapper<P>(
    WrappedComponent: React.ComponentType<P & SetViewProps>,
    viewName: ViewEnum,
): (props: P) => JSX.Element {
    return (props: P) => {
        const isSide = useAppSelector(selectCheckoutIsSide);
        const selectedOffer = useAppSelector(selectOffer);
        const submittedOffer = useAppSelector(submitOffer);
        const currentView = useAppSelector(selectCheckoutView);
        const dispatch = useDispatch<AppDispatch>();
        const isCheckoutPanelLoading = useAppSelector(selectLoading);
        const isVisible = currentView == viewName;

        const setView = (view: ViewEnum) => {
            dispatch(setCheckoutView(view));
        };

        const reset = () => {
            dispatch(setSubmitted(false));
            dispatch(resetCheckout());
            dispatch(resetOffers());
        };

        const classes = Classnames(
            'checkout-panel-view',
            { 'checkout-panel-view--active': isVisible },
            { isLoading: isCheckoutPanelLoading && isVisible },
        );

        return (
            <div className={classes}>
                <WrappedComponent
                    {...props}
                    isSide={isSide}
                    isVisible={isVisible}
                    setView={setView}
                    reset={reset}
                    selectedOffer={selectedOffer}
                    submittedOffer={submittedOffer}
                />
            </div>
        );
    };
}

export default checkoutPanelViewWrapper;
