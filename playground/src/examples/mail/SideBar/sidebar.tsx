import * as React from 'react';
import { quark, ThemeProvider } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import {
  faFeatherAlt,
  faTrash,
  faBiohazard,
  faCogs,
  faTint,
  faPalette,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { ThemeContext } from '../ThemeContext';
import './styles.css';

const Quark = quark('div');
const Button = quark('button');

const menu = [
  { name: 'Inbox', icon: faEnvelope, target: '' },
  { name: 'Sent', icon: faPaperPlane, target: 'sent' },
  { name: 'Draft', icon: faFeatherAlt, target: 'draft' },
  { name: 'Bin', icon: faTrash, target: 'bin' },
  { name: 'Spam', icon: faBiohazard, target: 'spam' },
  { name: 'All', icon: faTasks, target: 'all' },
];

type Props = {
  title: string;
  iconName: IconDefinition;
  target: string;
};

export const Sidebar = () => {
  const theming = React.useContext(ThemeContext);

  return (
    <Quark
      css={{
        flex: '10%',
        backgroundColor: 'backgroundMedium',
        width: '200px',
        boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'fontSecondary',
        borderRadius: '16px 0 0 16px',
        justifyContent: 'space-between',
      }}
    >
      <Quark css={{ width: '100%' }}>
        {menu.map((item) => (
          <SidebarItem
            title={item.name}
            iconName={item.icon}
            target={item.target}
          />
        ))}
      </Quark>

      <Quark
        css={{
          width: '100%',
          paddingBottom: 'small',
          backgroundColor: 'backgroundDark',
          borderRadius: '0 0 0 16px',
        }}
        className="dropdown"
      >
        <SidebarItem title="Settings" iconName={faCogs} target="" />
        <Quark
          className="dropdown-content"
          css={{
            flexDirection: 'column',
            alignItems: 'center',
            paddingY: 'x-small',
          }}
        >
          <Quark css={{ textAlign: 'center' }}>Color palette</Quark>
          <Quark css={{ textAlign: 'center' }}>
            <Button
              onClick={theming.green}
              type="button"
              css={{
                backgroundColor: '#006666',
                width: '25px',
                height: '25px',
                border: '3px solid #009999',
                borderRadius: '100%',
                margin: '4px',
                outline: 'none',
                textAlign: 'center',
              }}
            />
            <Button
              onClick={theming.blue}
              type="button"
              css={{
                backgroundColor: '#0ca0d8',
                width: '25px',
                height: '25px',
                borderRadius: '100%',
                border: '3px solid #9ee0f9',
                margin: '4px',
                outline: 'none',
                textAlign: 'center',
              }}
            />
            <Button
              onClick={theming.violet}
              type="button"
              css={{
                backgroundColor: '#3c3c72',
                width: '25px',
                height: '25px',
                borderRadius: '100%',
                border: '3px solid #7070b2',
                margin: '4px',
                outline: 'none',
                textAlign: 'center',
              }}
            />
            <Button
              onClick={theming.gray}
              type="button"
              css={{
                backgroundColor: '#484d53',
                width: '25px',
                height: '25px',
                borderRadius: '100%',
                border: '3px solid gray',
                margin: '4px',
                outline: 'none',
                color: 'white',
                textAlign: 'center',
              }}
            />
          </Quark>
        </Quark>
      </Quark>
    </Quark>
  );
};

const SidebarItem = ({ title, iconName, target }: Props) => {
  return (
    <Button
      css={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 'small',
        paddingY: 'x-small',
        backgroundColor: 'inherit',
        border: 'none',
        color: 'fontSecondary',
        '&:hover': { backgroundColor: 'backgroundHighlight' },
        '&:focus': { outline: 'none' },
      }}
    >
      <a
        href={`/${  target}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <FontAwesomeIcon
          icon={iconName}
          style={{
            width: '40px',
            height: '40px',
          }}
        />
        <Quark
          css={{
            marginTop: 'x-small',
            marginLeft: 'x-small',
            marginRight: 'x-small',
          }}
        >
          {title}
        </Quark>
      </a>
    </Button>
  );
};
