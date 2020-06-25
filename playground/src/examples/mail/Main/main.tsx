import * as React from 'react';
import { quark } from '@gumption-ui/quark'; // eslint-disable-line import/no-extraneous-dependencies
import {
  faEllipsisV,
  faCircle,
  faPaperclip,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';

const Quark = quark('div');
const Button = quark('button');
const Input = quark('input');
const Image = quark('image');

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
    senderPicture: 'https://i.imgur.com/AtTQKzd.png',
    receiverEmail: 'me@gmail.com',
    receiverName: 'Adda S.',
    receiverPicture: '',
    date: '2020-06-07',
    time: '14:15',
    subject: 'Hi',
    text:
      'Im happy to hear that you were able to do that thing we discussed the other day. Do you have some feedbakc on that?',
    status: 'unread',
    folder: 'inbox',
    starred: 'false',
  },
  {
    id: 2,
    senderEmail: 'me@gmail.com',
    senderName: 'Adda S.',
    senderPicture: 'https://i.imgur.com/PDx2uVd.png',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'This is a subject, Im very important',
    text: 'Im happy too',
    status: 'draft',
    folder: 'draft',
    starred: 'true',
  },
  {
    id: 3,
    senderEmail: 'me@gmail.com',
    senderName: 'Samik H.',
    senderPicture: 'https://i.imgur.com/jKMdTPm.png',
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
    senderName: 'Jess S.',
    senderPicture: 'https://i.imgur.com/utZVTbA.png',
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
        paddingLeft: 'large',
        boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
      }}
    >
      <Input
        placeholder="Search"
        css={{
          marginY: 'large',
          width: '98%',
          padding: '4px',
          border: '1px solid gray',
        }}
      />
      Infox
      {emails.map((mail, index) => (
        <EmailEntry info={mail} id={index} />
      ))}
    </Quark>
    <Quark
      css={{
        display: 'flex',
        flexDirection: 'column',
        flex: '60%',
        backgroundColor: 'white',
        boxShadow: '1px 5px 24px 0 rgba(68,102,242,.05)',
        justifyContent: 'space-between',
        borderRadius: '0 16px 16px 0',
      }}
    >
      <Quark
        css={{
          flex: '90%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 5px 24px 0 rgba(0,0,0,.1)',
          backgroundColor: '#f5f5ff',
          paddingX: 'large',
          paddingTop: 'large',
        }}
      >
        <Quark
          css={{
            flex: '50%',
            boxShadow: '2px 5px 24px 0 rgba(0,0,0,.1)',
            marginBottom: 'medium',
          }}
        >
          <EmailEntry info={emails[0]} id={emails[0].id} />
        </Quark>
        <Quark
          css={{
            flex: '25%',
            boxShadow: '2px 5px 24px 0 rgba(0,0,0,.1)',
            marginBottom: 'medium',
          }}
         />
        <Quark
          css={{
            flex: '25%',
            boxShadow: '2px 5px 24px 0 rgba(0,0,0,.1)',
            marginBottom: 'medium',
          }}
         />
      </Quark>
      <Quark
        css={{
          display: 'flex',
          flex: '10%',
          alignItems: 'center',
        }}
      >
        <Button
          css={{
            height: 'large',
            backgroundColor: 'backgroundDark',
            color: 'fontWhite',
            border: 'none',
            borderRadius: '5px',
            paddingX: 'medium',
            marginX: 'medium',
          }}
        >
          Reply
        </Button>
        <Quark>or</Quark>
        <Button
          css={{
            height: 'large',
            backgroundColor: 'backgroundDark',
            color: 'fontWhite',
            border: 'none',
            borderRadius: '5px',
            paddingX: 'medium',
            marginX: 'medium',
          }}
        >
          Forward
        </Button>
      </Quark>
    </Quark>
  </>
);

const EmailEntry = ({ info, id }: Props) => {
  return (
    <Quark
      css={{
        display: 'flex',
      }}
    >
      <Quark
        css={{
          backgroundColor: 'backgroundDark',
          marginBottom: 'small',
          display: 'flex',
          flex: '98%',
          boxShadow: '2px 4px 12px 0 rgb(0,0,0, 0.2)',
          padding: 'small',
        }}
      >
        <Quark
          css={{
            display: 'flex',
            flex: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={emails[id].senderPicture}
            alt="img"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '2px 4px 12px 0 rgb(0,0,0, 0.2)',
            }}
          />
        </Quark>
        <Quark
          css={{
            flex: '65%',
            paddingLeft: 'x-small',
          }}
        >
          <Quark css={{ color: 'fontWhite', paddingBottom: 'x-small' }}>
            {info.senderName}
          </Quark>
          <Quark css={{ color: 'fontSecondary', paddingBottom: 'x-small' }}>
            Subject: {info.subject}
          </Quark>
          <Quark css={{ color: 'fontSecondary' }}>{info.text}</Quark>
        </Quark>
        <Quark
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: '20%',
            paddingLeft: 'x-small',
            justifyContent: 'space-between',
            alignItems: 'space-between',
          }}
        >
          <Quark css={{}}>
            <Quark
              css={{
                color: 'fontWhite',
                textAlign: 'end',
                paddingBottom: 'x-small',
              }}
            >
              {info.date}
            </Quark>
            <Quark
              css={{
                color: 'fontSecondary',
                textAlign: 'end',
                paddingBottom: 'xx-small',
              }}
            >
              {info.time}
            </Quark>
            <Quark
              css={{
                color: 'fontSecondary',
                textAlign: 'end',
                paddingBottom: 'x-small',
              }}
            >
              <FontAwesomeIcon
                icon={faStar}
                style={{
                  width: 'medium',
                  height: 'medium',
                  marginTop: '8px',
                }}
              />
              <FontAwesomeIcon
                icon={faPaperclip}
                style={{
                  width: 'medium',
                  height: 'medium',
                  marginTop: '8px',
                }}
              />
            </Quark>
          </Quark>
          <Quark css={{ color: 'fontSecondary', textAlign: 'end' }}>
            <FontAwesomeIcon
              icon={faCircle}
              style={{
                width: '8px',
                height: '8px',
                marginTop: '8px',
              }}
            />
          </Quark>
        </Quark>
      </Quark>
      <Quark css={{ flex: '2%', color: 'fontSecondary', textAlign: 'end' }}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </Quark>
    </Quark>
  );
};
