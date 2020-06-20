import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import {
  faFeatherAlt,
  faTrash,
  faBiohazard,
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
      backgroundColor: '#3c3c77',
      width: '200px',
      marginRight: '30px',
      boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: '#7070b2',
      borderRadius: '16px 0 0 16px',
    }}
  >
    {menu.map((item) => (
      <SidebarItem title={item.name} iconName={item.icon} />
    ))}
  </Quark>
);

const SidebarItem = ({ title, iconName }: Props) => {
  return (
    <>
      <FontAwesomeIcon
        icon={iconName}
        style={{
          width: '48px',
          height: '48px',
          marginTop: '30px',
        }}
      />
      <Quark
        css={{
          marginTop: '8px',
        }}
      >
        {title}
      </Quark>
    </>
  );
};
