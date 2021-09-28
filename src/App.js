import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/profile/edit">
          <div data-testid="page-profile-edit"><ProfileEdit /></div>
        </Route>
        <Route path="/album/:id">
          <div data-testid="page-album"><Album /></div>
        </Route>
        <Route path="/favorites">
          <div data-testid="page-favorites"><Favorites /></div>
        </Route>
        <Route exact path="/profile">
          <div data-testid="page-profile"><Profile /></div>
        </Route>
        <Route path="/search">
          <div data-testid="page-search"><Search /></div>
        </Route>
        <Route exact path="/">
          <div data-testid="page-login"><Login /></div>
        </Route>
        <Route exact path="/page/not/found">
          <div data-testid="page-not-found"><NotFound /></div>
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
