import styled from 'styled-components';

// Colors: 5A0B4D or 772D8B

const headerHeight = '10vh';
const footerHeight = '5vh';

const mainColor = '#5A0B4D';


export const GiftContainer = styled.div`
    height: calc(100vh - ${headerHeight} - ${footerHeight});
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 2%;
`

export const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    y-overflow: hidden;
`

export const HomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const HeaderDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2% 10%;
    height: ${headerHeight};
    background-color: ${mainColor};
`

export const LogoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50%;
    cursor: pointer;
`

export const Logo = styled.span`
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -3px;
    color: #fafafa;
`

export const Subtitle = styled.span`
    font-size: 16px;
    font-weight: bold;
    color: #fafafa;
`

export const UserDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 30%;
    height: 50%;
    align-items: center;
`
export const ColoredButton = styled.button`
    background-color: ${mainColor};
    border: 2px solid ${mainColor};
    width: 30%;
    color: #fafafa;
    font-weight: bold;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #fafafa;
        color: ${mainColor};
    }
`

export const ColoredA = styled.a`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${mainColor};
    border: 2px solid ${mainColor};
    width: 30%;
    color: #fafafa;
    font-weight: bold;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #fafafa;
        color: ${mainColor};
    }
`

export const WhiteButton = styled.button`
    background-color: #fafafa;
    border: 2px solid #fafafa;
    width: 30%;
    color: ${mainColor};
    font-weight: bold;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${mainColor};
        color: #fafafa;
    }
`

export const FooterDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    padding: 0% 10%;
    top: 0;
    left: 0;
    height: ${footerHeight};
    width: 100vw;
    margin-top: calc(100vh - ${footerHeight} - 1px);
    background-color: #fafafa;
    border-top: 1px solid #d3d3d3;
`

export const Background = styled.div`
    background-color: ${mainColor};
    height: 50vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 30vh;
    width: 45vw;
    background-color: white;
    border-radius: 12px;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    margin-top: calc((100vh - 30vh) / 2 + 3%);
    margin-left: calc((100vw - 80vw) / 2);
    border: 2px solid ${mainColor};
`

export const SearchBar = styled.div`
    width: 40%;
    height: 30px;
    border: 1px solid ${mainColor};
    border-radius: 5px;
    padding: 5px;
    margin: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fafafa;
`

export const SearchInput = styled.input`
    width: 60%;
    height: 100%;
    border: none;
    border-bottom: 2px solid #fafafa;
    transform-origin: left;
    padding-left: 10px;
    outline: none;
    font-size: 14px;
    background-color: transparent;
    transition: all 0.4s ease-in-out;
    &:focus {
        border-bottom: 2px solid ${mainColor};
    }
`

export const InputField = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: 30px;
    margin-top: 5%;
`

export const HomeImages = styled.div`  
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    width: 100vw;
    top: 0;
    margin-top: calc(100vh - 50vh + 10px);
    margin-left: 120vw;
    z-index: -1;
`

export const ProfileDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
    height: calc(100vh - (${headerHeight} + ${footerHeight}));
`

export const InfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 70%;
    border-radius: 12px;
    border: 2px solid ${mainColor};
    margin-top: 8vh;
    padding: 15px;
    background-color: white;
`

export const InfoTitle = styled.h2`
    font-size: 20px;
    color: ${mainColor};
    font-weight: bold;
`

export const CreateEventButton = styled.button`
    background-color: ${mainColor};
    border-radius: 50%;
    height: 50px;
    width: 50px;
    border: 2px solid ${mainColor};
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    font-size: 58px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: #fafafa;
        color: ${mainColor};
    }

`

export const HeaderEvents = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0% 10%;
    width: 80%;
    align-items: center;
`

export const CreateEventDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60vw;
    height: 70vh;
    border-radius: 12px;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    margin-top: calc((100vh - 60vh) / 2);
    margin-left: calc((100vw - 60vw) / 2);
`

export const TranslucentBackground = styled.div`
    background-color: rgba(0, 0, 0, 0.8);
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`

export const CloseButton = styled.span`
    font-size: 30px;
    color: ${mainColor};
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        transform: rotate(180deg);
    }
`

export const FormItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin-top: 10px;
    height: 100px;
    justify-content: center;
    align-items: flex-start;
`

export const FormLabel = styled.label`
    font-size: 21px;
    color: ${mainColor};
    font-weight: bold;
`

export const FormInput = styled.input`
    width: 70%;
    height: 20px;
    border: none;
    border-bottom: 2px solid #afafaf;
    border-radius: 5px;
    padding: 5px;
    margin: 10px;
    font-size: 14px;
    outline: none;
    transition: all 0.4s ease-in-out;
    &:focus {
        border-bottom: 2px solid ${mainColor};
    }
`

export const EventList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 10px;
`

export const SingleEventDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 80%; 
    height: 120px;
    margin-top: 7px;
    margin-bottom: 7px;
    background-color: white;
    padding: 10px;
    border-radius: 12px;
    border: 1px solid ${mainColor};
`

export const SingleEventHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin-left: 10%;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 60vh;
    width: 45vw;
    background-color: white;
    border-radius: 12px;
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    margin-top: calc((100vh - 60vh) / 2);
    margin-left: calc((100vw - 45vw) / 2);
    border: 2px solid ${mainColor};
`

export const ProfileImage = styled.img`
    width: 40%;
    height: 40%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    margin-top: 25%;
`

export const NotBoughtDiv = styled.div`
    display: flex;
    margin: 10px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 40%;
    height: 20%;
`