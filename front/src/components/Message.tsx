import * as React from 'react';
import styled from 'styled-components';
import messageType from '../types/messageType';

const MessageContainer = styled.div`
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    display: block;
    padding: 0.5rem;
    max-width: 800px;
    margin: 0.5rem auto 0 auto;
`;

interface Props{
    message: messageType;
}

const PostsList: React.FunctionComponent<Props> = (props: Props) => {
    const { message } = props;

    return (
        <>
            <div>message.body</div>
        </>
    );
}


export default PostsList;