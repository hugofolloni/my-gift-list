import React, { useState } from 'react';
import axios from 'axios';

import { LoginForm, Background, FormContainer, FormItem, FormLabel, FormInput, ColoredButton, InfoTitle } from '../styles/styles';

const CreateUser: React.FC = () => {
    
        const [username, setUsername] = useState<string>('');
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const [name, setName] = useState<string>('');

        const handleSubmit = () => {
            fetch(`http://localhost:8080/users?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if(data.length > 0){
                    return alert('User already exists');
                }
            })  
            .then(() => {
                axios.post('http://localhost:8080/users', {
                username: username,
                email: email,
                password: password,
                name: name
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    localStorage.setItem('username', username);
                    window.location.href = '/profile';
                })
            })
        }

        return (
            <LoginForm>
                <Background/>
                <FormContainer style={{height: '80vh', marginTop: "calc((100vh - 80vh) / 2)"}}>
                    <InfoTitle style={{fontSize: '32px', marginBottom: '-5px'}}>Create User</InfoTitle>
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormInput type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormInput type="text" value={name} onChange={e => setName(e.target.value)}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormInput type="email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </FormItem>
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormInput type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </FormItem>
                    <ColoredButton style={{height: '40px', margin: '20px 0px 20px 0px'}}onClick={() => handleSubmit()}>Create User</ColoredButton>
                </FormContainer>
                <a style={{marginTop: '95vh', textDecoration: 'none', color: '#5A0B4D'}} href="/login">Already have an account? Log in!</a>
            </LoginForm>
        );
    }

export default CreateUser;