import React from 'react';
import { RouteComponentProps } from 'react-router-dom'
import Enumerable from 'linq';
import MessagePoster from './MessagePoster';
import messageType from 'src/types/messageType';
import Message from './Message';

type Props = {} & RouteComponentProps<{ id: number }>;
const Post: React.FunctionComponent<Props> = (props: Props) => {
    const { id } = props.match.params;

    const initList = (messages: messageType[]) => {
        let list: JSX.Element[] = [];
        messages.map((element: messageType, i: number) => (
            list.push(<Message key={i} message={element} replayFnc={(n) => replay(n)} />)
        ));
        return list;
    };

    const getPosts = (): => {
        fetch(`/api/v1/posts/${id}`, {
            method: "GET",
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            setMessageList(data.messages);
            setDisplayList(initList(data.messages));
            setIsLoading(false);
            console.log(messageList);
            return data;
        })
        .catch(err => {
            console.log("err=" + err);
            return {};
        });
    }
    const [messageList, setMessageList] = React.useState(getPosts);
    const [toReplay, setToReplay] = React.useState(0);


    const replay = (ParentId: number, list: any) => {
        setToReplay(ParentId);
    };

    const [displayList, setDisplayList] = React.useState([]);
    const [isLoadong, setIsLoading] = React.useState(true);

    return (
        <>
            <h1>メッセージリスト</h1>
            {!isLoadong && (
                displayList
            )}
            <MessagePoster postId={id} parentId={toReplay}/>
        </>
    );
}


export default Post;