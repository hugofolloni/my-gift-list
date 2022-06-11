import React, { useState } from "react";
import { Body, HomeDiv, Background, Container, SearchBar, SearchInput, InputField, WhiteButton, ColoredButton, HomeImages } from "../styles/styles";
import Footer from "./Footer";
import Header from "./Header";
import gifts from "../assets/gifts.svg";

const Home: React.FC = () => {

    const [search, setSearch] = useState<string>("");

    return <Body>
        <Header />
        <HomeDiv>
            <Background/>

            <InputField>
                <WhiteButton style={{ width: '20%'}} onClick={() => {window.location.href = '/profile'}}>Profile</WhiteButton>
                <SearchBar>
                    <SearchInput placeholder="Search by event code" onChange={(e) => setSearch(e.target.value)} />
                    <ColoredButton onClick={() => {window.location.href = `/event?q=${search}`}}>Search</ColoredButton>
                </SearchBar>
            </InputField>
           
            <Container>
                <p style={{fontWeight: '600'}}>Imagine a place where you can tell your friends the gifts that you want for your event, and they can organize themselves to handle the gifts for you!</p>
                <p>Now you have it!</p>
                <p>Create your event and send the link to your friends! Tell the gifts that you want and wait for the great day!</p>
            </Container>

            <HomeImages>
                <img src={gifts} alt="gifts" width='400px' />            </HomeImages>
        </HomeDiv>
        <Footer />
    </Body>
}

export default Home;