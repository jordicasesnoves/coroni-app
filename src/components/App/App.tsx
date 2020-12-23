import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { Routes } from '../../routes';

const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        <Switch>
          {Routes.map((route: RouteProps) => (
            <Route
              path={route.path}
              exact={route.exact}
              component={route.component}
              key={route?.path?.toString()}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
