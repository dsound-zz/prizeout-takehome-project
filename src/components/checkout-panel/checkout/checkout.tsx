import React, { useState } from 'react';
import { GiftCard } from '../../common';
import checkoutPanelViewWrapper from '../view-wrapper';
import { v4 as uuid_v4 } from 'uuid';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

import CheckoutButton from './checkout-button';

import './checkout.less';

const CheckoutPanelView: React.FC<any> = ({ selectedOffer }): React.ReactElement => {
    const [selectedGiftOffer, setSelectedGiftOffer] = useState<PrizeoutOfferValueOptions | null>(null);

    const centsConverter = (cents: number) => {
        const converted = (cents / 100).toString();
        console.log(converted);
        return `$${converted}`;
    };

    const selectGift = (giftCardOffer: PrizeoutOfferValueOptions) => {
        setSelectedGiftOffer(giftCardOffer);
    };

    console.log(selectedGiftOffer);
    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item no-scrollbars">
                    <section className="checkout__brand">
                        {selectedOffer && (
                            <GiftCard
                                name={selectedOffer.name}
                                imgUrl={selectedOffer.image_url}
                                altText={selectedOffer.name}
                                className="offer"
                            />
                        )}
                    </section>
                    <section className="checkout__valueOptions">
                        <h3 className="checkout__valueHeader">Select a value option</h3>
                        <div className="checkout__valueSelections">
                            {selectedOffer &&
                                selectedOffer?.giftcard_list.map(
                                    (giftCardOffer: PrizeoutOfferValueOptions, idx: number) => (
                                        <button
                                            key={uuid_v4()}
                                            onClick={() => selectGift(giftCardOffer)}
                                            className={
                                                giftCardOffer.checkout_value_id === selectedGiftOffer?.checkout_value_id
                                                    ? 'checkout__value-selected'
                                                    : 'checkout__value-selection'
                                            }
                                        >
                                            {centsConverter(giftCardOffer.value_in_cents)}
                                        </button>
                                    ),
                                )}
                        </div>
                    </section>
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton selectedGiftOffer={selectedGiftOffer} />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
