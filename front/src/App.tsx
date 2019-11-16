import * as React from 'react';
import PostsList from './components/PostsList'

class App extends React.Component {
  public render() {
    return (
      <>
        <h1>掲示板リスト</h1>
        <PostsList />
      </>
    );
  }
}

export default App;
