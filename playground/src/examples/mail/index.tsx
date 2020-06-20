import * as React from 'react';
import { ThemeProvider } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Kalendar } from './calendar';
import { Chat } from './chat';
import { Home } from './home';
import { themeViolet, themeGreen } from './theme';

const themeMapping={violet: themeViolet, green: themeGreen}

export const Root = () => {
  const [themeName, setThemeName] = React.useState('violet')
  const toggleTheme = () => {
    setThemeName('green');
  }
  return (
    <ThemeProvider theme={themeMapping[themeName]}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/calendar">
              <Kalendar />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
          </Switch>
        </div>
      </Router>
      <button onClick={toggleTheme} type="button">Hi</button>
    </ThemeProvider>
  );
};
