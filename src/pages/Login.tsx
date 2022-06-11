import React, { useState } from 'react';

import { LoginForm } from '../styles/styles';

const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = () => {
        fetch(`http://localhost:8080/users?email=${email}`)
        .then(res => res.json())
        .then(data => {
            if(data.length > 0){
                if(data[0].password === password){
                    localStorage.setItem('email', email);
                    return window.location.href = `http://localhost:3000/profile`;
                }
                else{
                    alert("Email or password is incorrect");
                }
            }})
    }

    return (
        <LoginForm>
            <h1>Sign In</h1>
            <h3>Email</h3>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <h3>Password</h3>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit" onClick={() => handleSubmit()}>Sign In</button>
        </LoginForm>
    );
}

export default SignIn;
