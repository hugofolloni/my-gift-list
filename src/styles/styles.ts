import styled from 'styled-components';

export const GiftContainer = styled.div`
    height: 800%;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10%;
`

export const UniqueGift = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`

export const AddGiftButton = styled.button`
    background-color: #f5f5f5;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 100px;
    height: 30px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        background-color: #d3d3d3;
        color: #f5f5f5;
    }
`
