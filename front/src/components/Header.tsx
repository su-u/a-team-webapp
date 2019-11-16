import * as React from 'react';
import styled from 'styled-components';

const HeaderComponent = () => {
    return (
        <>
            <Header>
                <Title>掲示板</Title>
            </Header>
        </>
    );
};

const Header = styled.div`
    top: 0;
    width: 100%;
    background-color: #202124;
    height: 60px;
    color: white;
    display: flex;
`;

const Title = styled.div`
    padding-left: 30px;
    padding-top: 10px;
    font-size: 30px;
`;

export default HeaderComponent;
