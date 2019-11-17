import * as React from 'react';
import App from './App';
import Post from './components/Post';
import Header from './components/Header';
import GlobalStyle from './components/GlobalStyle';
import { HashRouter, Route } from 'react-router-dom'

export default () => (
  <>
    <GlobalStyle />
    <HashRouter>
      <Header />
      <Route exact path='/' component={App} />
      <Route path='/post/:id' component={Post} />
    </HashRouter>
  </>
);
