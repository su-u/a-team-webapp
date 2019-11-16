import * as React from 'react';
import PostsList from './components/PostsList'

class App extends React.Component {
  public render() {
    return (
      <>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
      <PostsList />
      </>
    );
  }
}

export default App;
