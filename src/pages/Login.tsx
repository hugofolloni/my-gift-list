import React, { useState } from 'react';

import { LoginForm } from '../styles/styles';

const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = () => {
        console.log(email, password);
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
