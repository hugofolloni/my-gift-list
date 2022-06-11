import React, { useState, useEffect } from 'react';
import CreateEvent from './CreateEvent';

const MyEvents: React.FC = () => {

    const email = localStorage.getItem('email') || undefined;

    type Event = {
        id: number;
        name: string;
    }

    const [myEvents, setMyEvents] = useState<Event[]>([]);
    const [eventExists, setEventExists] = useState<boolean>(false);

    useEffect(() => {
    if(email !== undefined){
        fetch(`http://localhost:8080/events?owner=${email}`)
        .then(res => res.json())
        .then(data => {
            setMyEvents(data)
            if(data.length > 0) setEventExists(true);
        })
    }
    }, [email]);

    const [createEventDiv, setCreateEventDiv] = useState<boolean>(false);


    return (
        <div>
            <h1>My Events</h1>
            {eventExists ? myEvents.map(event => (
                <div>{event.name}
                    <a href={`/event?q=${event.id}`}>Go to event</a>
                </div>
            ))
            : <div>You don't have any events yet</div>}
            <button onClick={() => setCreateEventDiv(true)}>Create</button>
            {createEventDiv ? <CreateEvent /> : null}
        </div>
    );
}

export default MyEvents;