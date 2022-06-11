import React, { useState, useEffect } from "react";
import { ColoredButton, WhiteButton, HeaderDiv, Logo, Subtitle, LogoDiv, UserDiv } from "../styles/styles";

const Header: React.FC = () => {

    const username = localStorage.getItem('username');
    const [displayUser, setDisplayUser] = useState<string>("");

    const [buttonAction, setButtonAction] = useState<string>("");

    useEffect(() => {
        if (username) {
            fetch(`http://localhost:8080/users?username=${username}`)
            .then(res => res.json())
            .then(data => {
                if(data.length > 0) {
                    setDisplayUser(data[0].username);
                    setButtonAction("Logout");
                }
            })
        } else{
            setDisplayUser("Convidado!");
            setButtonAction("Login");
        }
    }, [username]);

    const handleLogin = () => {
        if (buttonAction === "logout") localStorage.removeItem('username');
        window.location.href = "/login";
    }

    const redirectHome = () => {
        window.location.href = "/";
    }
            

    return <HeaderDiv>
            <LogoDiv onClick={() => redirectHome()}>
                <Logo>mygiftlist</Logo>
                <Subtitle>your event-gifts organizer</Subtitle>
            </LogoDiv>
            <UserDiv>
                <Subtitle>Welcome, <span style={{cursor: 'pointer'}} onClick={() => window.location.href='/profile'}>{displayUser}</span></Subtitle>
                <WhiteButton onClick={() => handleLogin()}>{ buttonAction }</WhiteButton>
            </UserDiv>
        </HeaderDiv>
}

export default Header;