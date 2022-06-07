import React, {useState} from "react";
import axios from 'axios';

const AddGift: React.FC = () => {

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
        axios.post('http://localhost:8080/gifts', newGift)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
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