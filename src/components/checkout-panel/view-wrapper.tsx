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
} from '../../slices/checkout-slice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

export interface SetViewProps {
    isSide: boolean;
    isVisible: boolean;
    setView: (view: ViewEnum) => void;
    selectedOffer: any;
}

export function checkoutPanelViewWrapper<P>(
    WrappedComponent: React.ComponentType<P & SetViewProps>,
    viewName: ViewEnum,
): (props: P) => JSX.Element {
    return (props: P) => {
        const isSide = useAppSelector(selectCheckoutIsSide);
        const selectedOffer = useAppSelector(selectOffer);
        const currentView = useAppSelector(selectCheckoutView);
        const dispatch = useDispatch<AppDispatch>();
        const isCheckoutPanelLoading = useAppSelector(selectLoading);
        const isVisible = currentView == viewName;

        const setView = (view: ViewEnum) => {
            dispatch(setCheckoutView(view));
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
                    selectedOffer={selectedOffer}
                />
            </div>
        );
    };
}

export default checkoutPanelViewWrapper;
