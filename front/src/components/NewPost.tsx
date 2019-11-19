import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 800px;
    margin: 20px auto 0 auto;
    > input {
        width: 400px;
    }
`;

const NewPost: React.FunctionComponent<{}> = () => {
    const [postName, setPostName] = React.useState('');

    const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 1000) {
            setPostName(event.target.value);
        }
    };

    const createPost = () => {
        const obj = { title: postName };
        const body = JSON.stringify(obj);
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const method = 'POST';
        fetch(`/api/v1/posts/`, { method, headers, body })
            .then(response => {
                return response.json();
            })
            .then(data => {
                location.reload();
                return data;
            })
            .catch(err => {
                console.warn('err=' + err);
                return {};
            });
        setPostName('');
    };

    return (
        <>
            <Container>
                <input type="text" onChange={onChangeText}></input>
                <button onClick={createPost}>作成</button>
            </Container>
        </>
    );
};

export default NewPost;
