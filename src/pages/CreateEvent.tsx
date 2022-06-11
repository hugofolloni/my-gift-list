import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent: React.FC = () => {
    
        const [name, setName] = useState<string>('');
        const [date, setDate] = useState<string>('');

        const handleSubmit = () => {
            axios.post('http://localhost:8080/events', {
                name: name,
                date: date,
                owner: localStorage.getItem('email'),
                gifts: []
            })
        }

        return (
            <div>
                <h1>Create Event</h1>
                <h3>Name</h3>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                <h3>Date</h3>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <button onClick={() => handleSubmit()}>Create Event</button>
            </div>
        );
    }

export default CreateEvent;
