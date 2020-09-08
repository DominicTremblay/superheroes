import React from 'react';
import './App.css';
import Navbar from './Navbar';
import Search from './Search';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import useSuperheros from './hooks/useSuperheros';
import Superheros from './Superheros';
import Home from './Home';
import SuperheroPage from './SuperheroPage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';

function App() {
  const { state, dispatch } = useSuperheros();

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/login">
                <Login />
              </Route>

              <PrivateRoute exact path="/superheros">
                <Superheros loading={state.loading} />
              </PrivateRoute>

              <Route path="/superheros/:id">
                <SuperheroPage superheros={state.superheros} />
              </Route>

              <PrivateRoute path="/search">
                <Search />
              </PrivateRoute>

              <Route path="*">
                <h1>404 - Path not found</h1>
              </Route>
            </Switch>
          </Router>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </div>
  );
}

export default App;
