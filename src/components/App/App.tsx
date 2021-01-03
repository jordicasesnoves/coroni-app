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
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4">
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
      </div>
    </Router>
  );
};

export default App;
