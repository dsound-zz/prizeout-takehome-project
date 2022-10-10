import React, { useState } from 'react';
import Classnames from 'classnames';
import { useAppSelector } from '../../../../../hooks';
import { PrizeoutOffer, PrizeoutOfferSettings } from '../../../../../slices/offers-slice';
import { getOffer, isSubmitted, selectCheckoutView } from '../../../../../slices/checkout-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';

import './vertical-offers.less';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
}

const VerticalOffers: React.FC<OfferView> = ({ offers, viewSettings }): React.ReactElement => {
    const [activeOfferId, setActiveOfferId] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const submitted = useAppSelector(isSubmitted);
    const checkoutView = useAppSelector(selectCheckoutView);
    const heading = viewSettings.title || 'Recommended';
    const subtitle = viewSettings.subtitle || null;
    const classes: string = Classnames('vertical-offers', { '--has-subtitle': subtitle });
    const offerClickHandler = (offer: PrizeoutOffer) => {
        // prevent further clicking during confirmation message
        if (!submitted) {
            const offerId: string = offer.giftcard_list[0].checkout_value_id;
            setActiveOfferId(offerId);
            dispatch(getOffer(offer));
        }
    };

    const returnOffers = () => {
        return offers.map((offer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                onClickHandler={() => offerClickHandler(offer)}
                activeOfferId={activeOfferId}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {subtitle && <h3>{subtitle}</h3>}
            {offers && <div className="vertical-offers__gift-cards">{returnOffers()}</div>}
        </div>
    );
};

export default VerticalOffers;
