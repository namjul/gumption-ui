import * as React from 'react';
import { ThemeProvider } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Kalendar } from './calendar';
import { Chat } from './chat';
import { Home } from './home';
import { themeViolet, themeGreen, themeBlue, themeGray } from '../../theme';
import { ThemeContext } from './ThemeContext';

const themeMapping = {
  violet: themeViolet,
  green: themeGreen,
  blue: themeBlue,
  gray: themeGray,
};

export const Root = () => {
  const [themeName, setThemeName] = React.useState('violet');
  const toggleThemeGreen = () => {
    setThemeName('green');
  };
  const toggleThemeViolet = () => {
    setThemeName('violet');
  };
  const toggleThemeBlue = () => {
    setThemeName('blue');
  };
  const toggleThemeGray = () => {
    setThemeName('gray');
  };

  const theming = {
    violet: toggleThemeViolet,
    green: toggleThemeGreen,
    blue: toggleThemeBlue,
    gray: toggleThemeGray,
  };
  return (
    <ThemeContext.Provider value={theming}>
      <ThemeProvider theme={themeMapping[themeName]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home folder="inbox" />
            </Route>

            <Route exact path="/sent">
              <Home folder="sent" />
            </Route>
            <Route exact path="/draft">
              <Home folder="draft" />
            </Route>
            <Route exact path="/bin">
              <Home folder="bin" />
            </Route>
            <Route exact path="/spam">
              <Home folder="spam" />
            </Route>
            <Route exact path="/all">
              <Home folder="" />
            </Route>
            <Route path="/calendar">
              <Kalendar />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
