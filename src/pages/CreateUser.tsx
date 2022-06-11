import React, { useState } from 'react';
import axios from 'axios';

const CreateUser: React.FC = () => {
    
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [name, setName] = useState<string>('');

        const handleSubmit = () => {
            fetch(`http://localhost:8080/users?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if(data.length > 0){
                    return alert('User already exists');
                }
            })       
            axios.post('http://localhost:8080/users', {
                email: email,
                password: password,
                name: name
            })
            .catch(err => {
                console.log(err);
            }
            );
            localStorage.setItem('email', email);
            window.location.href = '/profile';
        }

        return (
            <div>
                <h1>Create User</h1>
                <h3>Name</h3>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                <h3>Email</h3>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <h3>Password</h3>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button onClick={() => handleSubmit()}>Create User</button>
            </div>
        );
    }

export default CreateUser;