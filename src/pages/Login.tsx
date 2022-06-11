import React, { useState } from 'react';

import { LoginForm, Background, FormContainer, FormItem, FormLabel, FormInput, ColoredButton, InfoTitle } from '../styles/styles';

const SignIn: React.FC = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    window.addEventListener('load', () => {
        const username = localStorage.getItem('username');
        if (username) {
            localStorage.removeItem('username');
        }
    })

    const handleSubmit = () => {
        fetch(`http://localhost:8080/users?username=${username}`)
        .then(res => res.json())
        .then(data => {
            if(data.length > 0){
                if(data[0].password === password){
                    localStorage.setItem('username', username);
                    return window.location.href = `http://localhost:3000/profile`;
                }
                else{
                    alert("Username or password is incorrect");
                }
            }})
    }

    return (
        <LoginForm>
            <Background/>
            <FormContainer>
            <InfoTitle style={{fontSize: '32px'}}>Sign In</InfoTitle>
            <FormItem>
                <FormLabel>Username</FormLabel>
                <FormInput type="text" value={username} onChange={e => setUsername(e.target.value)}/>
            </FormItem>
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormInput type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </FormItem>           
            <ColoredButton style={{height: '40px', margin: '20px 0px 20px 0px'}} type="submit" onClick={() => handleSubmit()}>Sign In</ColoredButton>
            </FormContainer>
            <a style={{marginTop: '90vh', textDecoration: 'none', color: '#5A0B4D'}} href="/signup">Don't have an account? Create right now!</a>
           </LoginForm>
    );
}

export default SignIn;
