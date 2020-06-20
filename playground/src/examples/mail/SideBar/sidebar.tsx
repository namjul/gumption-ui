import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import {
  faFeatherAlt,
  faTrash,
  faBiohazard,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

const Quark = quark('div');

const menu = [
  { name: 'Inbox', icon: faEnvelope },
  { name: 'Sent', icon: faPaperPlane },
  { name: 'Draft', icon: faFeatherAlt },
  { name: 'Bin', icon: faTrash },
  { name: 'Spam', icon: faBiohazard },
];

type Props = {
  title: string;
  iconName: IconDefinition;
};

export const Sidebar = () => (
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
        <SidebarItem title={item.name} iconName={item.icon} />
      ))}
    </Quark>
    <Quark css={{ width: '100%', paddingBottom: "large", backgroundColor: "backgroundDark", borderRadius: '0 0 0 16px',}}>
      <SidebarItem title="Settings" iconName={faCogs} />
    </Quark>
  </Quark>
);

const SidebarItem = ({ title, iconName }: Props) => {
  return (
    <Quark
      css={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 'large',
      }}
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
        }}
      >
        {title}
      </Quark>
    </Quark>
  );
};
