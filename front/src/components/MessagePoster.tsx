import * as React from 'react';
import styled from 'styled-components';

const InputForm = styled.form`
    height: 100%;
    width: 80%;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    margin: 50px auto 20px auto;
    text-align: center;
    padding: 10px;

    > div {
        text-align: right;
        padding-top: 10px;
        padding-right: 20px;
    }
`;

const InputArea = styled.textarea`
    font-family: inherit;
    color: #000000;
    width: 70%;
    height: 100px;
    margin: 0 auto;
    padding: 5px;
    border-bottom: 1px solid #ccc;
`;

const SubmitButton = styled.button`
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
    postId: number;
    parentId: number | null;
    reset: () => void;
}

const MessageArea: React.FunctionComponent<Props> = (props: Props) => {
    const { parentId, postId, reset } = props;
    const [textValue, setTextValue] = React.useState('');
    const [postAvailable, setPostAvailable] = React.useState(false);

    const post = (
        textValue: string,
        postId: number,
        parentId: number | null
    ) => {
        const obj = { body: textValue, post_id: postId, parent_id: parentId };
        const body = JSON.stringify(obj);
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        const method = 'POST';
        fetch(`/api/v1/messages/`, { method, headers, body })
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
    };

    const onChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value.length <= 1000) {
            setTextValue(event.target.value);
        }
        if (event.target.value.length <= 0) {
            setPostAvailable(false);
        } else {
            setPostAvailable(true);
        }
    };

    const onSubmit = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();

        post(textValue, postId, parentId);
        setTextValue('');
        setPostAvailable(false);
    };

    return (
        <>
            <InputForm>
                <h2>入力欄</h2>
                {parentId != null && (
                    <>
                        <p>返信先: {parentId}</p>
                    </>
                )}
                <InputArea
                    value={textValue}
                    onChange={onChangeText}
                    maxLength={1000}
                />
                <div>
                    <SubmitButton onClick={reset} disabled={parentId == null}>
                        返信先リセット
                    </SubmitButton>

                    <SubmitButton onClick={onSubmit} disabled={!postAvailable}>
                        投稿
                    </SubmitButton>
                </div>
            </InputForm>
        </>
    );
};

export default MessageArea;
