import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CheckoutSlice {
    isSide: boolean;
    loading: boolean;
    view: ViewEnum;
    offer: any;
    finalOffer: any;
    submitted: boolean;
    reset: () => void;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isSide: true,
    loading: false,
    view: 'checkout',
    offer: null,
    finalOffer: null,
    submitted: false,
    reset: null,
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        toggleIsSide(state) {
            // TODO: Check screen size to determine if it's side or bottom
            state.isSide = !state.isSide;
        },
        getOffer(state, action: PayloadAction<any>) {
            state.offer = action.payload;
        },
        setOffer(state, action: PayloadAction<any>) {
            state.finalOffer = action.payload;
        },
        setSubmitted(state, action: PayloadAction<any>) {
            state.submitted = action.payload;
        },
        resetCheckout: () => checkoutInitialState,
    },
});

export const { setCheckoutView, toggleIsLoading, toggleIsSide, getOffer, setOffer, resetCheckout, setSubmitted } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectCheckoutIsSide = ({ checkout }: RootState): boolean => {
    return checkout.isSide;
};

export const selectOffer = ({ checkout }: RootState): any => {
    return checkout.offer;
};

export const submitOffer = ({ checkout }: RootState): any => {
    return checkout.finalOffer;
};

export const isSubmitted = ({ checkout: { submitted } }: RootState): boolean => submitted;

export default checkoutSlice.reducer;
