import * as React from 'react';
import { Link } from 'react-router-dom';

import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {
  faCalendar,
  faEnvelope,
  faCommentAlt,
  faStar,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Quark = quark('div');

export const HeaderBar = ({ path }: { path: string }) => (
  <Quark css={{ display: 'flex', alignItems: 'center', paddingY: '30px' }}>
    <Quark
      css={{ flex: '20%', fontSize: '30px', fontWeight: 600, lineHeight: 1.2 }}
    >
      EMAIL APP
    </Quark>
    <Quark css={{ flex: '50%' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <FontAwesomeIcon
          icon={faHome}
          style={{
            color: '#4466f2',
          }}
        />{' '}
      </Link>{' '}
      / Email App / {path}
    </Quark>
    <Quark css={{ flex: '30%', textAlign: 'end' }}>
      <Link to="/calendar">
        <FontAwesomeIcon
          icon={faCalendar}
          style={{
            width: '24px',
            height: '24px',
            marginRight: '10px',
            color: '#343a40',
          }}
        />
      </Link>

      <Link to="/">
        <FontAwesomeIcon
          icon={faEnvelope}
          style={{
            width: '24px',
            height: '24px',
            marginRight: '10px',
            color: '#343a40',
          }}
        />
      </Link>

      <Link to="/chat">
        <FontAwesomeIcon
          icon={faCommentAlt}
          style={{
            width: '24px',
            height: '24px',
            marginRight: '10px',
            color: '#343a40',
          }}
        />
      </Link>

      <FontAwesomeIcon
        icon={faStar}
        style={{
          width: '24px',
          height: '24px',
          color: '#ffc107',
          marginRight: '10px',
        }}
      />
    </Quark>
  </Quark>
);
