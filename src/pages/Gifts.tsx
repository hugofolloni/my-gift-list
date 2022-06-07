import React, { useState } from 'react';
import AddGift from './AddGift';
import { GiftContainer, UniqueGift, AddGiftButton } from '../styles/styles';

const Gifts: React.FC = () => {

    type Gift = {
        name: string;
        price: number;
        description: string;
        url: string;
    }
    
    const [gifts, setGifts] = useState<Gift[]>([]);

    const [addGiftDiv, setAddGiftDiv] = useState<boolean>(false);


    return (
        <GiftContainer>
            <h1>Gifts</h1>
            <ul>
                {gifts.map((gift, index) => {
                    return (
                        <UniqueGift>{gift.name}</UniqueGift>
                    )
                })}
            </ul>
            <AddGiftButton onClick={() => setAddGiftDiv(true)}/>
            {addGiftDiv && <AddGift />}
        </GiftContainer>
    );
}

export default Gifts;