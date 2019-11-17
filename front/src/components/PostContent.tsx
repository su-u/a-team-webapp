import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import postType from '../types/postType';

const MessageContainer = styled.div`
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    display: block;
    padding: 0.5rem;
    margin-top: 10px;
    > button {
        margin-left: auto;
    }
    > input {
        width: 400px;
    }
`;


const Button = styled.button`
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    font-weight: bold;
    line-height: 1;
    -webkit-text-decoration: none;
    text-decoration: none;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
    top: 0;
    transition: 0.2s all;
    display: inherit;

    &:hover {
        top: -2px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
        top: 0;
    }
`;

interface Props {
    post: postType;
}

const PostsList: React.FunctionComponent<Props> = (props: Props) => {
    const { post } = props;
    const [opneChanger, setOpneChanger] = React.useState(false);
    const [reName, setRename] = React.useState('');

    const postDelete = () => {
        const method = 'DELETE';
        fetch(`/api/v1/posts/${post.id}`,
            { method })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                location.reload();
                return data;
            })
            .catch(err => {
                console.log("err=" + err);
                return {};
            });
    };

    const postUpdate = () => {
        const method = 'PUT';
        const obj = { title: reName };
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(`/api/v1/posts/${post.id}`, { method, headers, body })
            .then(response => {
                return response.json();
            })
            .then(data => {
                location.reload();
                return data;
            })
            .catch(err => {
                console.log("err=" + err);
                return {};
            });
    };

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 1000) {
            setRename(event.target.value);
        }
    };

    return (
        <>
            <MessageContainer>
                <Link to={`/post/${post.id}`}>
                    {post.title}
                </Link>
                <Button onClick={() => postDelete()}>削除</Button>
                <Button onClick={() => { setOpneChanger(!opneChanger) }}>変更</Button>
                {opneChanger && (
                    <>
                        <input type="text" onChange={onChangeText}></input>
                        <button onClick={postUpdate}>更新</button>
                    </>
                )}
            </MessageContainer>
        </>
    );
}


export default PostsList;