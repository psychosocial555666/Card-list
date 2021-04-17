import * as React from 'react';
import history from "../../history";
import Main from '../main/main';
import {Switch, Route, Router} from "react-router-dom";
import NewCard from '../new-card/new-card';
import EditCard from '../edit-card/edit-card';

function App() {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route 
        exact path="/new"
        >
          <NewCard />
        </Route>
        <Route path="/edit/:id">
          <EditCard />
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
