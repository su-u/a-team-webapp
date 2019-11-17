import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import postType from '../types/postType';
import NewPost from './NewPost';

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

const PostsList: React.FunctionComponent<{}> = () => {
    const getPosts = () => {
        fetch("/api/v1/posts/", {
            method: "GET",
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const d = data;
            console.log(d);
            setPostsList(d);
            setIsLoading(false);
        })
        .catch(function (err1) {
            console.log("err=" + err1);
        });
    }

    const [postsList, setPostsList] = React.useState(getPosts);
    const [isLoadong, setIsLoading] = React.useState(true);


    return (
        <>
            {!isLoadong && (
                postsList.data.map((element: postType, i: number) => (
                    <MessageContainer key={i} >
                        <Link to={`/post/${element.id}`}>{element.title}</Link>
                    </MessageContainer>
                ))
            )}
            <NewPost />
        </>
        );
}


export default PostsList;