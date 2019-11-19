import * as React from 'react';
import styled from 'styled-components';
import messageType from '../types/messageType';

const MessageContainer = styled.div<{ isReplay: boolean }>`
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
    color: #4a4a4a;
    display: block;
    padding: 0.5rem;
    margin-top: 10px;
    margin-left: ${(props: any) => (props.isReplay ? '20px' : '0')};
    > button {
        margin-left: auto;
    }
    > span {
        margin-right: 20px;
    }
    > p {
        margin-block-start: 0;
        margin-block-end: 0;
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
    message: messageType;
    replayFnc: (ParentId: number) => void;
    isReplay: boolean;
}

const PostsList: React.FunctionComponent<Props> = (props: Props) => {
    const { message, replayFnc, isReplay } = props;

    const messageDelete = () => {
        const method = 'DELETE';
        fetch(`/api/v1/messages/${message.id}`, { method })
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

    return (
        <>
            <MessageContainer isReplay={isReplay}>
                <p>{message.id}:</p>
                {message.parent_id != null && (
                    <>
                        {message.parent_id} >> <br />
                    </>
                )}
                {message.body}
                <Button onClick={() => replayFnc(message.id)}>返信</Button>
                <Button onClick={messageDelete}>削除</Button>
            </MessageContainer>
        </>
    );
};

export default PostsList;
