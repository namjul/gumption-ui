import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import {
    faEllipsisV, faCircle
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { IconDefinition } from '@fortawesome/fontawesome-common-types';

const Quark = quark('div');
const Input = quark('input');

type Props = {
  id: number;
  senderEmail: string;
  senderName: string;
  senderPicture: string;
  receiverEmail: string;
  receiverName: string;
  receiverPicture: string;
  date: string;
  time: string;
  subject: string;
  text: string;
  status: string;
  folder: string;
  starred: boolean;
};

const emails = [
  {
    id: 1,
    senderEmail: 'lubo@gmail.com',
    senderName: 'Lubos Kos',
    senderPicture: '',
    receiverEmail: 'me@gmail.com',
    receiverName: 'Adda S.',
    receiverPicture: '',
    date: '2020-06-07',
    time: '14:15',
    subject: 'Hi',
    text: 'Im happy',
    status: 'unread',
    folder: 'inbox',
    starred: 'false',
  },
  {
    id: 2,
    senderEmail: 'me@gmail.com',
    senderName: 'Adda S.',
    senderPicture: '',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im happy too',
    status: 'draft',
    folder: 'draft',
    starred: 'true',
  },
  {
    id: 3,
    senderEmail: 'me@gmail.com',
    senderName: 'Adda S.',
    senderPicture: '',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im happy too',
    status: 'draft',
    folder: 'draft',
    starred: 'true',
  },
  {
    id: 4,
    senderEmail: 'me@gmail.com',
    senderName: 'Adda S.',
    senderPicture: '',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im happy too',
    status: 'draft',
    folder: 'draft',
    starred: 'true',
  },
];

export const Main = () => (
  <>
    <Quark
      css={{
        flex: '40%',
        backgroundColor: 'backgroundLight',
        paddingRight: 'large',
        paddingLeft: "large",
        boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
      }}
    >
      <Input placeholder="Search" css={{marginY: "large", width: "98%"}}/>
      {emails.map((mail) => (
        <EmailEntry info={mail} />
      ))}
    </Quark>
    <Quark
      css={{
        flex: '60%',
        backgroundColor: 'white',
        boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
        borderRadius: "0 16px 16px 0"
      }}
    />
  </>
);

const EmailEntry = ({ info }: Props) => {
  return (
    <Quark  css={{
        display: 'flex',
      }}>
    <Quark
      css={{
        backgroundColor: 'backgroundDark',
        marginBottom: 'small',
        display: 'flex',
        flex: "98%",
        boxShadow: '2px 4px 12px 0 rgb(0,0,0, 0.2)'
      }}
    >
      <Quark css={{
        flex: "15%"
      }}>Image here</Quark>
      <Quark css={{
        flex: "65%"
      }}>
        <Quark css={{ color: 'fontWhite' }}>{info.senderEmail}</Quark>
        <Quark css={{ color: 'fontSecondary' }}>{info.subject}</Quark>
        <Quark css={{ color: 'fontSecondary' }}>{info.text}</Quark>
      </Quark>
      <Quark css={{
        flex: "20%",
      }}>
        <Quark css={{ color: 'fontWhite', textAlign: "end" }}>{info.date}</Quark>
        <Quark css={{ color: 'fontSecondary', textAlign: "end" }}>{info.time}</Quark>
        <Quark css={{ color: 'fontSecondary', textAlign: "end" }}><FontAwesomeIcon icon={faCircle} style={{
          width: '8px',
          height: '8px',
          marginTop: "8px"
        }}/></Quark>
      </Quark>
      
    </Quark>
    <Quark css={{flex:"2%", color: "fontSecondary", textAlign: "end"}}><FontAwesomeIcon icon={faEllipsisV} /></Quark>
    </Quark>
  );
};
