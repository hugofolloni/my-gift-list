import React, {useState} from "react";
import axios from 'axios';

const AddGift: React.FC = (props) => {

    const eventId = window.location.href.split('?q=')[1];

    type Gift = {
        name: string;
        price: number;
        description: string;
        url: string;
    }
    
    const [newGift, setNewGift] = useState<Gift>({
        name: '',
        price: 0,
        description: '',
        url: ''
    });

    const handleSubmit = () => {
        fetch(`http://localhost:8080/events/${eventId}`)
        .then(res => res.json())
        .then(data => {
            var newData = data;
            newData.gifts.push(newGift);
            axios.put(`http://localhost:8080/events/${eventId}`, newData)
        })
        window.location.reload();
    }



    return (
        <div>
        <h1>Add Gift</h1>
        <h3>Name</h3>
        <input type="text" value={newGift.name} onChange={e => setNewGift({...newGift, name: e.target.value})}/>
        <h3>Price</h3>
        <input type="number" value={newGift.price} onChange={e => setNewGift({...newGift, price: parseInt(e.target.value)})}/>
        <h3>Description</h3>
        <input type="text" value={newGift.description} onChange={e => setNewGift({...newGift, description: e.target.value})}/>
        <h3>URL</h3>
        <input type="text" value={newGift.url} onChange={e => setNewGift({...newGift, url: e.target.value})}/>
        <button onClick={() => handleSubmit()}>Add Gift</button>
        </div>
    );

}

export default AddGift;