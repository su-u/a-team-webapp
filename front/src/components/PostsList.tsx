import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import postType from '../types/postType';
import NewPost from './NewPost';
import PostContent from './PostContent';

const Content = styled.div`
    max-width: 800px;
    margin: 0 auto;
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
            <Content>
            {!isLoadong && (
                postsList.data.map((element: postType, i: number) => (
                    <PostContent key={i} post={element}></PostContent>
                ))
                )}
            </Content>
            <NewPost />
        </>
        );
}


export default PostsList;