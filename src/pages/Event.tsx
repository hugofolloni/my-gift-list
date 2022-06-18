import React, { useEffect, useState } from 'react';
import { GiftContainer, GiftList, SingleEventDiv, EventInfoDiv, Body, WhiteButton, InfoTitle, EventList, HeaderEvents, CreateEventButton, InfoDiv, SingleEventHeader, ColoredA, NotBoughtDiv, ColoredButton, TranslucentBackground, CreateEventDiv, CloseButton, FormItem, FormLabel, FormInput, ProfileImage, RedButton } from '../styles/styles';
import Footer from './Footer';
import Header from './Header';
import paint from '../assets/paint.svg'

const Event: React.FC = () => {

    type Gift = {
        name: string;
        price: number;
        description: string;
        url: string;
        checked: boolean;
        image: string;
        event: number;
    }

    type Event = {
        name: string;
        date: string;
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
        fetch(`http://localhost:4000/api/events/${eventId}`)
        .then(res => res.json())
        .then(data => {
            setEvent({"id": data.id, "name": data.name, "date": data.date, "owner": data.owner});
            if(data.name !== undefined) setEventExists(true);
        })
        .then(() => {
            fetch(`http://localhost:4000/api/gifts?event=${eventId}`)
            .then(res => res.json())
            .then(data => {
                setGifts(data);
            })
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
        var confirm:boolean = window.confirm(`Are you sure you want to confirm the buy of ${gift.name}?`);
        if(confirm){
            fetch(`http://localhost:4000/api/gifts?name=${gift.name}&event=${eventId}`)
            .then(res => res.json())
            .then(data => {
                if(data.length > 0){
                    fetch(`http://localhost:4000/api/gifts/${data[0].id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: gift.name,
                            price: gift.price,
                            description: gift.description,
                            url: gift.url,
                            checked: true,
                            image: gift.image,
                            event: eventId
                        })
                    })
                    .then(res => {
                        window.location.reload();
                    }
                    )
                }
            }
            )
        }
    }
       

    const [newGift, setNewGift] = useState<Gift>({
        'name': '',
        'price': 0,
        'description': '',
        'url': '',
        'checked': false,
        'image': '',
        'event': parseInt(eventId)
    });

    const handleSubmit = () => {
        console.log(newGift);
        var containsHttp:number = newGift.url.indexOf("http")
        if(containsHttp === -1){
            console.log("Nao tem http")
            newGift.url = "https://" + newGift.url
        }
        fetch(`http://localhost:4000/api/gifts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newGift)
        })
        .then( () => window.location.reload())
    }

    const deleteGift = (gift: Gift) => {
        var confirm:boolean = window.confirm(`Are you sure you want to delete ${gift.name}?`);
        if(confirm){
            fetch(`http://localhost:4000/api/gifts?name=${gift.name}&event=${eventId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.length > 0){
                    fetch(`http://localhost:4000/api/gifts/${data[0].id}`, {
                        method: 'DELETE'
                    })
                    .then(res => {
                        res.json();
                        window.location.reload();
                    }
                    )
                }
            }
            )
        }
    }

    const [isCopying, setIsCopying] = useState<boolean>(false);
    const [eventURL, setEventURL] = useState<string>('');

    const copyURL = () => {
        setIsCopying(true);
        setEventURL(window.location.href);
    }

    const toClipboard = () => {
        navigator.clipboard.writeText(eventURL);
        setIsCopying(false);
    }

    return (
        <Body>
            <Header />
            {eventExists ?
                <GiftContainer>
                    <EventInfoDiv >
                        <InfoTitle>{event?.name}</InfoTitle>
                       <span><strong>Date: </strong>{event?.date}</span>
                       <span><strong>Id: </strong>{event?.id}</span>
                       <WhiteButton onClick={() => copyURL()} style={{height: '40px', marginLeft: '200px', marginTop: '-40px'}}>Copy</WhiteButton>
                    </EventInfoDiv>
                    <GiftList>
                        <HeaderEvents>
                            <InfoTitle style={{fontSize: '32px'}}>Gifts</InfoTitle>
                            {havePermission && <CreateEventButton onClick={() => setAddGiftDiv(true)}>+</CreateEventButton>}
                        </HeaderEvents>
                        <EventList>
                            {gifts && gifts.map((gift, index) => {
                                return (
                                    <SingleEventDiv>
                                        <SingleEventHeader>
                                            <InfoTitle>{gift.name}</InfoTitle>
                                            <ColoredA href={gift.url}>Ver</ColoredA>
                                        </SingleEventHeader>
                                        <span><strong>R$ {gift.price}</strong></span>
                                        <span>{gift.description}</span>
                                        <div style={{display: 'flex', width: '100%', height: 'fit-content', flexDirection: 'row', justifyContent: 'space-between'}}>
                                        { !gift.checked  && 
                                            <NotBoughtDiv>
                                                <p style={{color: '#912F40', fontWeight: 'bold'}}>Need to buy!</p>
                                                <ColoredButton style={{fontSize: '10px'}} onClick={() => buyingGift(gift)}>I did it!</ColoredButton>
                                                
                                            </NotBoughtDiv>
                                        }
                                        {
                                            !gift.checked && havePermission && (
                                                <RedButton style={{fontSize: '10px'}} onClick={() => deleteGift(gift)}>Delete</RedButton>
                                            )
                                        }
                                        </div>
                                        
                                    </SingleEventDiv>
                                )
                            })}
                        </EventList>
                    </GiftList>
               
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

            {isCopying && (
                <div>
                <TranslucentBackground/>
                <CreateEventDiv style={{height: '30%', flexDirection: 'column', alignItems:'center',justifyContent: 'space-around'}}>
                    <CloseButton style={{marginLeft: '80%'}} onClick={() => setIsCopying(false)}>X</CloseButton>
                    <div style={{width: '100%', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
                        <div style={{backgroundColor: "#fafafa", width: "50%", border: '1px solid #5A0B4D', borderRadius: '12px', paddingLeft: '20px'}}><p>{eventURL}</p></div>
                        <WhiteButton style={{height: '80%', width: '20%'}} onClick={() => toClipboard()}>Copy</WhiteButton>
                    </div>
                </CreateEventDiv>
                </div>
                )}

        </Body>
    );
}

export default Event;