import * as React from 'react';
import { ThemeProvider, quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Kalendar } from './calendar';
import { Chat } from './chat';
import { Home } from './home';
import { themeViolet, themeGreen, themeBlue, themeGray } from './theme';

const themeMapping = {
  violet: themeViolet,
  green: themeGreen,
  blue: themeBlue,
  gray: themeGray,
};
const Button = quark('button');

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
      <Button
        onClick={toggleThemeGreen}
        type="button"
        css={{
          backgroundColor: '#006666',
          width: '50px',
          height: '50px',
          borderRadius: '100%',
          border: '0 solid transparent',
          outline: 'none',
        }}
       />
      <Button
        onClick={toggleThemeViolet}
        type="button"
        css={{
          backgroundColor: '#3c3c72',
          width: '50px',
          height: '50px',
          borderRadius: '100%',
          border: '0 solid transparent',
          outline: 'none',
        }}
       />
      <Button
        onClick={toggleThemeBlue}
        type="button"
        css={{
          backgroundColor: '#0ca0d8',
          width: '50px',
          height: '50px',
          borderRadius: '100%',
          border: '0 solid transparent',
          outline: 'none',
        }}
       />
      <Button
        onClick={toggleThemeGray}
        type="button"
        css={{
          backgroundColor: '#484d53',
          width: '50px',
          height: '50px',
          borderRadius: '100%',
          border: '0 solid transparent',
          outline: 'none',
        }}
       />
    </ThemeProvider>
  );
};
