import * as React from 'react';
// import styled from 'styled-components';

const PostsList: React.FunctionComponent<{}> = () => {
    const [postsList, setPostsList] = React.useState({});
    const [isLoadong, setIsLoading] = React.useState(true);

    const getPosts = () => {
        console.log('p');
        fetch("/api/v1/posts/", {
            method: "GET",
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const d = JSON.stringify(data);
            console.log(d);
            setPostsList(d);
            setIsLoading(false);
        })
        .catch(function (err1) {
            console.log("err=" + err1);
        });
    }


    return (
        <>
            <div onClick={getPosts}>aaa</div>
            {/* {!isLoadong && postsList.data} */}
        </>
        );
}


export default PostsList;