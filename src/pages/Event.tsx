import React, { useEffect, useState } from 'react';
import AddGift from './AddGift';
import { GiftContainer, UniqueGift, AddGiftButton } from '../styles/styles';

const Event: React.FC = () => {

    type Gift = {
        name: string;
        price: number;
        description: string;
        url: string;
        checked: boolean;
        image: string;
    }

    type Event = {
        name: string;
        date: string;
        gifts: Gift[];
        owner: string;
    }

    const eventId = window.location.href.split('?q=')[1];
    
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [event, setEvent] = useState<Event>();
    const [eventExists, setEventExists] = useState<boolean>(false);

    const [addGiftDiv, setAddGiftDiv] = useState<boolean>(false);
    const [havePermission, setHavePermission] = useState<boolean>(false);

    const [emailOnLocalStorage, setEmailOnLocalStorage] = useState<string>('');

    useEffect(() => {
        fetch(`http://localhost:8080/events/${eventId}`)
        .then(res => res.json())
        .then(data => {
            setEvent({"name": data.name, "date": data.date, "gifts": data.gifts, "owner": data.owner});
            setGifts(data.gifts);
            if(data.name !== undefined) setEventExists(true);
        })
        .then(() => {
            const email = localStorage.getItem('email');
            if (email) {
                setEmailOnLocalStorage(email);
                if(event && event.owner === emailOnLocalStorage){
                    setHavePermission(true);
                }
            }
        })
    }, [emailOnLocalStorage, eventId]);

    return (
        <div>
            {eventExists ?
                <GiftContainer>
                    <h1>Gifts from event {event?.name}</h1>
                    <ul>
                        {gifts.map((gift, index) => {
                            return (
                                <UniqueGift>
                                    <p>{gift.name}</p>
                                    <p>{gift.price}</p>
                                    <p>{gift.description}</p>
                                    <p>{gift.checked}</p>
                                </UniqueGift>
                            )
                        })}
                    </ul>
                    {havePermission && <AddGiftButton onClick={() => setAddGiftDiv(true)}>Add Gift</AddGiftButton>}
                    {addGiftDiv && <AddGift />}
            </GiftContainer>
            : <h1>Event does not exist</h1>}
        </div>
    );
}

export default Event;