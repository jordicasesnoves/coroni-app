import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  RouteProps,
  Switch,
} from 'react-router-dom';
import { Routes } from '../../routes';
import { Footer } from '../index';

const App = (): JSX.Element => {
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <Router>
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
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
