import React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components';
import postsType from '../types/postsType';
import MessagePoster from './MessagePoster';

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

type Props = {} & RouteComponentProps<{ id: number }>;
const PostsList: React.FunctionComponent<Props> = (props: Props) => {
    const { id } = props.match.params;
    const getPosts = () => {
        console.log('p');
        fetch(`/api/v1/posts/${id}`, {
            method: "GET",
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const d = data;
            console.log(d);
            setMessageList(d);
            setIsLoading(false);
        })
        .catch(err => {
            console.log("err=" + err);
            return {};
        });
    }

    const [messageList, setMessageList] = React.useState(getPosts);
    const [isLoadong, setIsLoading] = React.useState(true);


    return (
        <>
            <h1>メッセージリスト</h1>
            {!isLoadong && (
                messageList.messages.map((element: postsType, i: number) => (
                    <MessageContainer key={i} >
                        {element.body}
                    </MessageContainer>
                ))
            )}
            < MessagePoster id={id}/>
        </>
    );
}


export default PostsList;