import React, { useEffect, useState } from 'react';
import { GiftContainer, SingleEventDiv, Body, InfoTitle, EventList, HeaderEvents, CreateEventButton, InfoDiv, SingleEventHeader, ColoredA, NotBoughtDiv, ColoredButton, TranslucentBackground, CreateEventDiv, CloseButton, FormItem, FormLabel, FormInput, ProfileImage } from '../styles/styles';
import Footer from './Footer';
import Header from './Header';
import axios from "axios";
import paint from '../assets/paint.svg'

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
        id: number;
    }

    const eventId = window.location.href.split('?q=')[1];
    
    const [gifts, setGifts] = useState<Gift[]>([]);
    const [event, setEvent] = useState<Event>();
    const [eventExists, setEventExists] = useState<boolean>(false);

    const [addGiftDiv, setAddGiftDiv] = useState<boolean>(false);
    const [havePermission, setHavePermission] = useState<boolean>(false);

    const [userOnLocalStorage, setUserOnLocalStorage] = useState<string>('');

    useEffect(() => {
        fetch(`http://localhost:8080/events/${eventId}`)
        .then(res => res.json())
        .then(data => {
            setEvent({"id": data.id, "name": data.name, "date": data.date, "gifts": data.gifts, "owner": data.owner});
            setGifts(data.gifts);
            if(data.name !== undefined) setEventExists(true);
        })
        .then(() => {
            const username = localStorage.getItem('username');
            if (username) {
                setUserOnLocalStorage(username);
                if(event && event.owner === userOnLocalStorage){
                    setHavePermission(true);
                }
            }
        })
    }, [userOnLocalStorage, eventId]);

    const buyingGift = (gift: Gift) => {
        var confirm:boolean = window.confirm(`Are you sure you want to cunfirm the buy of ${gift.name}?`);
        if(confirm){
            var newGifts = [...gifts]
            var indexOfChangedGift = newGifts.indexOf(gift)
            console.log(newGifts, indexOfChangedGift);
            newGifts[indexOfChangedGift] = {
                "name": gift.name,
                "price": gift.price,
                "description": gift.description,
                "url": gift.url,
                "image": gift.image,
                "checked": true
            }

            fetch(`http://localhost:8080/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": event?.name,
                    "date": event?.date,
                    "owner": event?.owner,
                    "gifts": newGifts
                })
            })
            .then(() => window.location.reload())
                        
        }
    }

    const [newGift, setNewGift] = useState<Gift>({
        'name': '',
        'price': 0,
        'description': '',
        'url': '',
        'checked': false,
        'image': ''
    });

    const handleSubmit = () => {
        var containsHttp:number = newGift.url.indexOf("http")
        if(containsHttp === -1){
            console.log("Nao tem http")
            newGift.url = "https://" + newGift.url
        }
        fetch(`http://localhost:8080/events/${eventId}`)
        .then(res => res.json())
        .then(data => {
            var newData = data;
            newData.gifts.push(newGift);
            axios.put(`http://localhost:8080/events/${eventId}`, newData)
            .then(res => console.log(res))
        })
        .then( () => window.location.reload())
    }


    return (
        <Body>
            <Header />
            {eventExists ?
                <GiftContainer>
                    <div style={{width: '30%', border: 'none', marginLeft: '20px', display: 'flex', flexDirection: 'column'}}>
                        <InfoTitle style={{fontSize: '42px', marginBottom: '5px'}}>{event?.name}</InfoTitle>
                       <span><strong>Date: </strong>{event?.date}</span>
                       <span><strong>Id: </strong>{event?.id}</span>
                    </div>
                    <InfoDiv style={{width: '55%'}}>
                    <HeaderEvents>
                        <InfoTitle style={{fontSize: '32px'}}>Gifts</InfoTitle>
                        {havePermission && <CreateEventButton onClick={() => setAddGiftDiv(true)}>+</CreateEventButton>}
                    </HeaderEvents>
                    <EventList>
                        {gifts.map((gift, index) => {
                            return (
                                <SingleEventDiv>
                                    <SingleEventHeader>
                                        <InfoTitle>{gift.name}</InfoTitle>
                                        <ColoredA href={gift.url}>Ver</ColoredA>
                                    </SingleEventHeader>
                                    <span><strong>R$ {gift.price}</strong></span>
                                    <span>{gift.description}</span>
                                    { !gift.checked  && 
                                        <NotBoughtDiv >
                                            <p style={{color: '#912F40', fontWeight: 'bold'}}>Need to buy!</p>
                                            <ColoredButton style={{fontSize: '10px'}} onClick={() => buyingGift(gift)}>I did it!</ColoredButton>
                                            
                                        </NotBoughtDiv>}
                                </SingleEventDiv>
                            )
                        })}
                    </EventList>
                    </InfoDiv>
               
            </GiftContainer>
            : <div style={{display: 'flex', width: '100vw', height: '70vh', justifyContent: 'center', alignItems: 'center'}}>
                <InfoTitle>Event does not exist!</InfoTitle>    
            </div>}
            <Footer/>

            {addGiftDiv ? <div>
                    <TranslucentBackground onClick={() => setAddGiftDiv(false)}/>
                    <CreateEventDiv style={{height: '90vh', marginTop: '5vh'}}>
                        <div style={{display: "flex", alignItems: 'center', width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <InfoTitle style={{fontSize: '32px'}}>Add Gift</InfoTitle>
                            <CloseButton onClick={() => setAddGiftDiv(false)}>X</CloseButton>                            
                        </div>
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormInput type="text" value={newGift.name} onChange={e => setNewGift({...newGift, name: e.target.value})}/>
                        </FormItem>
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormInput type="number" step='0.01' min='0' value={newGift.price} onChange={e => setNewGift({...newGift, price: Number(e.target.value)})} />
                        </FormItem>
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormInput type="text" value={newGift.description} onChange={e => setNewGift({...newGift, description: e.target.value})}/>                
                        </FormItem>
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormInput type="text" value={newGift.url} onChange={e => setNewGift({...newGift, url: e.target.value})}/>                      
                        </FormItem>
                        <ColoredButton style={{ height: '10%', width: '20%', marginLeft: '50%', marginTop: '40px', marginBottom: '10px'}} onClick={() => handleSubmit()}>Add</ColoredButton>
                    </CreateEventDiv>
                        </div>
                    : null
                    }

            <ProfileImage style={{marginLeft: '-40px', marginTop: '22%'}} src={paint} alt="paint"/>

        </Body>
    );
}

export default Event;