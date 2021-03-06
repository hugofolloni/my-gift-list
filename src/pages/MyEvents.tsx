import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { Body, ProfileDiv, InfoDiv, ListDiv, InfoTitle, CloseButton, CreateEventButton, CreateEventDiv, HeaderEvents, TranslucentBackground, FormItem, FormLabel, FormInput, ColoredButton, EventList, SingleEventDiv, SingleEventHeader, ProfileImage, RedButton } from '../styles/styles';
import baloons from '../assets/baloons.svg';

const MyEvents: React.FC = () => {


    const username = localStorage.getItem('username') || undefined;
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');

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
        id: number;
        name: string;
        date: string;
    }

    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [eventExists, setEventExists] = useState<boolean>(false);

    const [newEventName, setNewEventName] = useState<string>('');
    const [newEventDate, setNewEventDate] = useState<string>('');

    const handleSubmit = () => {
        axios.post('http://localhost:4000/api/events', {
            name: newEventName,
            date: newEventDate,
            owner: username
        })
        .then(res => {
            fetch(`http://localhost:4000/api/events?owner=${username}&name=${newEventName}`)
            .then(res => res.json())
            .then(res => {
                window.location.href = `/event?q=${res[0].id}`;
            }
            )
        })

    }

    useEffect(() => {
    if(username !== undefined){
        fetch(`http://localhost:4000/api/events?owner=${username}`)
        .then(res => res.json())
        .then(data => {
            setMyEvents(data)
            if(data.length > 0) setEventExists(true);
        })
        fetch(`http://localhost:4000/api/users?username=${username}`)
        .then(res => res.json())
        .then(data => {
            setEmail(data[0].email);
            setName(data[0].name);
        })
    }
    }, [username]);

    const [createEventDiv, setCreateEventDiv] = useState<boolean>(false);

    const deleteEvent = (id: number) => {
        axios.delete(`http://localhost:4000/api/events/${id}`)
        .then(res => {
            window.location.reload();
        }
        )
    }


    return (
        <Body>
            <Header />
            <ProfileDiv>
                <InfoDiv>
                    <InfoTitle>@{ username }</InfoTitle>
                    <span>- <strong>Name:</strong> { name }</span>
                    <span>- <strong>Email:</strong> { email }</span>
                    <span>- <strong>Number of events:</strong> { myEvents.length} </span>
                </InfoDiv>
                <ListDiv>
                    <HeaderEvents>
                        <h1>My Events</h1>
                        <CreateEventButton onClick={() => setCreateEventDiv(true)}>+</CreateEventButton>
                    </HeaderEvents>
                    {eventExists ? 
                        (<EventList>
                            {
                            myEvents.map(event => (
                                <SingleEventDiv>
                                    <SingleEventHeader>
                                        <InfoTitle>{event.name} - {event.id}</InfoTitle>
                                        <ColoredButton style={{height: '30px'}} onClick={() => window.location.href=`/event?q=${event.id}`}>Go to event</ColoredButton>
                                    </SingleEventHeader>
                                    <span>- <strong>Date:</strong> {event.date}</span>
                                    <RedButton style={{ marginLeft: '75%'}} onClick={() => deleteEvent(event.id)}>Delete</RedButton>
                                    {/* <span>- <strong>Number of gifts: </strong>{event}</span> */}
                                </SingleEventDiv>
                            ))}
                        </EventList>)
                    : <div>You don't have any events yet</div>}
                </ListDiv>
       
            </ProfileDiv>
            <Footer/>

            {createEventDiv ? <div>
                        <TranslucentBackground onClick={() => setCreateEventDiv(false)}/>
                        <CreateEventDiv>
                            <div style={{display: "flex", alignItems: 'center', width: '80%', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <InfoTitle style={{fontSize: '32px'}}>Create Event</InfoTitle>
                                <CloseButton onClick={() => setCreateEventDiv(false)}>X</CloseButton>                            
                            </div>
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormInput type="text" value={newEventName} onChange={e => setNewEventName(e.target.value)}/>
                            </FormItem>
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormInput type="date" value={newEventDate} onChange={e => setNewEventDate(e.target.value)}/>
                            </FormItem>
                            <ColoredButton style={{ height: '10%', width: '20%', marginLeft: '50%', marginTop: '40px'}} onClick={() => handleSubmit()}>Create Event</ColoredButton>
                        </CreateEventDiv>
                    </div>
            : null}

            <ProfileImage src={baloons} alt="baloons"/>
        </Body>
    );
}

export default MyEvents;