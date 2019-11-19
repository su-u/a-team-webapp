import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Enumerable from 'linq';
import MessagePoster from './MessagePoster';
import messageType from 'src/types/messageType';
import Message from './Message';
import styled from 'styled-components';

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

    &:hover {
        top: -2px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    &:active {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
        top: 0;
    }
`;

const Content = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

type Props = {} & RouteComponentProps<{ id: number }>;
const Post: React.FunctionComponent<Props> = (props: Props) => {
    const { id } = props.match.params;

    const initList = (messages: messageType[]) => {
        let list: messageType[] = [];
        Enumerable.from(messages)
            .where(x => x.parent_id == null)
            .toArray()
            .map((element: messageType) => {
                list.push(element);
            });
        Enumerable.from(messages)
            .where(x => x.parent_id != null)
            .toArray()
            .map((element: messageType) => {
                const searchId = element.parent_id;
                const index = list.findIndex(v => v.id === searchId);
                list.splice(index + 1, 0, element);
            });
        const newList = Enumerable.from(list)
            .select(x => createMessageElement(x))
            .toArray();
        return newList;
    };

    const createMessageElement = (message: messageType) => {
        if (message.parent_id == null) {
            return (
                <Message
                    key={message.id}
                    message={message}
                    replayFnc={n => replay(n)}
                    isReplay={false}
                />
            );
        } else {
            return (
                <Message
                    key={message.id}
                    message={message}
                    replayFnc={n => replay(n)}
                    isReplay={true}
                />
            );
        }
    };

    const getPosts = () => {
        fetch(`/api/v1/posts/${id}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                setMessageList(data.messages);
                setDisplayList(initList(data.messages));
                setIsLoading(false);
                return data;
            })
            .catch(err => {
                console.log('err=' + err);
                return {};
            });
    };

    const [messageList, setMessageList] = React.useState(getPosts);
    const [toReplay, setToReplay] = React.useState(null);

    const replay = (ParentId: number) => {
        setToReplay(ParentId);
    };

    const replayReset = () => {
        setToReplay(null);
    };

    const [displayList, setDisplayList] = React.useState([]);
    const [isLoadong, setIsLoading] = React.useState(true);

    return (
        <>
            <h1>メッセージリスト</h1>
            <Button onClick={getPosts}>更新</Button>
            {!isLoadong && <Content>{displayList}</Content>}
            <MessagePoster
                postId={id}
                parentId={toReplay}
                reset={replayReset}
            />
        </>
    );
};

export default Post;
