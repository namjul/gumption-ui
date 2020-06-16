import * as React from 'react';
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

export const HeaderBar = () => (
  <Quark css={{ display: 'flex', alignItems: 'center', paddingY: '30px' }}>
    <Quark
      css={{ flex: '20%', fontSize: '30px', fontWeight: 600, lineHeight: 1.2 }}
    >
      EMAIL APP
    </Quark>
    <Quark css={{ flex: '50%' }}>
      <FontAwesomeIcon icon={faHome} /> / Email App / Email app
    </Quark>
    <Quark css={{ flex: '30%', textAlign: 'end', color: '#343a40' }}>
      <FontAwesomeIcon
        icon={faCalendar}
        style={{ width: '24px', height: '24px', marginRight: '10px' }}
      />

      <FontAwesomeIcon
        icon={faEnvelope}
        style={{ width: '24px', height: '24px', marginRight: '10px' }}
      />

      <FontAwesomeIcon
        icon={faCommentAlt}
        style={{ width: '24px', height: '24px', marginRight: '10px' }}
      />

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
