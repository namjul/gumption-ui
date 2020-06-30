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
import './styles.css';

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

type Prop = {
  folder: string;
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
      'Im in inbox. Im happy to hear that you were able to do that thing we discussed the other day. Do you have some feedbakc on that?',
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
    text: 'Im draft',
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
    text: 'Im draft too',
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
    text: 'Im sent email ',
    status: 'draft',
    folder: 'sent',
    starred: 'true',
  },
  {
    id: 5,
    senderEmail: 'me@gmail.com',
    senderName: 'Jess S.',
    senderPicture: 'https://i.imgur.com/utZVTbA.png',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im spammy',
    status: 'draft',
    folder: 'spam',
    starred: 'true',
  },
  {
    id: 6,
    senderEmail: 'me@gmail.com',
    senderName: 'Jess S.',
    senderPicture: 'https://i.imgur.com/utZVTbA.png',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im spammyy too',
    status: 'draft',
    folder: 'spam',
    starred: 'true',
  },
  {
    id: 7,
    senderEmail: 'me@gmail.com',
    senderName: 'Jess S.',
    senderPicture: 'https://i.imgur.com/utZVTbA.png',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im in bin, bye bye',
    status: 'draft',
    folder: 'bin',
    starred: 'true',
  },
  {
    id: 8,
    senderEmail: 'me@gmail.com',
    senderName: 'Jess S.',
    senderPicture: 'https://i.imgur.com/utZVTbA.png',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im in bin, bye bye',
    status: 'draft',
    folder: 'bin',
    starred: 'true',
  },
  {
    id: 9,
    senderEmail: 'me@gmail.com',
    senderName: 'Jess S.',
    senderPicture: 'https://i.imgur.com/utZVTbA.png',
    receiverEmail: 'edit@gmail.com',
    receiverName: 'Edit S.',
    receiverPicture: '',
    date: '2020-06-09',
    time: '17:20',
    subject: 'Hello',
    text: 'Im in bin, bye bye',
    status: 'draft',
    folder: 'bin',
    starred: 'true',
  },
];

export const Main = ({ folder }: Prop) => {
  const emailsInFolder = emails.filter((email) =>
    folder.length > 0 ? email.folder === folder : email,
  );

  const [searchPattern, setSearchPattern] = React.useState('');
  const [folderEmails, setFolderEmails] = React.useState(null);
  const [searchedEmails, setSearchedEmails] = React.useState(emailsInFolder);

  const handleChange = (value) => {
    setSearchPattern(value);
  };

  const filterEmails = () => {
    const mails = emailsInFolder.filter((email) => {
      const matches =
        (email.subject || '')
          .toLowerCase()
          .indexOf(searchPattern.toLowerCase()) > -1 ||
        (email.senderName || '')
          .toLowerCase()
          .indexOf(searchPattern.toLowerCase()) > -1;
      return matches;
    });
    console.log('mails', mails);
    return mails;
  };

  return (
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
        <Quark css={{ display: 'flex' }}>
          <Input
            placeholder="Search"
            css={{
              marginY: 'large',
              width: '92%',
              padding: '4px',
              border: '1px solid gray',
              '&:focus': { outline: 'none' },
            }}
            onChange={(event) => {
              handleChange(event.target.value);
            }}
          />
        </Quark>

        <Quark css={{ color: 'fontSecondary', paddingBottom: 'x-small' }}>
          {folder ? folder.charAt(0).toUpperCase() + folder.slice(1) : 'All'}
        </Quark>
        <Quark css={{ height: '650px', overflowY: 'scroll' }}>
          {filterEmails().map((mail, index) => (
            <EmailEntry
              info={mail}
              id={index}
              font={{
                size: null,
                colorMain: 'fontWhite',
                colorSecondary: 'fontSecondary',
              }}
              variant="backgroundDark"
              displayShadow
              displayMore
              displayStatus
              displayAttachment
              displayStar
              displayExcerpt
            />
          ))}
        </Quark>
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
            <EmailEntry
              info={emails[0]}
              id={emails[0].id}
              font={{
                size: 'medium',
                colorMain: 'fontPrimary',
                colorSecondary: 'fontSecondary',
              }}
              variant=""
              displayShadow={false}
              displayMore={false}
              displayStatus={false}
              displayAttachment={false}
              displayStar={false}
              displayExcerpt={false}
            />
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
              marginX: 'large',
            }}
          >
            Reply
          </Button>
          <Button
            css={{
              height: 'large',
              backgroundColor: 'backgroundHighlight',
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
};

const EmailEntry = ({
  info,
  id,
  displayMore,
  displayStatus,
  displayAttachment,
  displayStar,
  displayExcerpt,
  variant,
  displayShadow,
  font,
}: Props) => {
  return (
    <Quark
      css={{
        display: 'flex',
      }}
    >
      <Quark
        css={{
          backgroundColor: variant,
          marginBottom: 'small',
          display: 'flex',
          flex: '98%',
          boxShadow: displayShadow ? '2px 4px 12px 0 rgb(0,0,0, 0.2)' : 'none',
          padding: 'small',
          fontSize: font.size,
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
          <Quark css={{ color: font.colorMain, paddingBottom: 'x-small' }}>
            {info.senderName}
          </Quark>
          <Quark css={{ color: font.colorSecondary, paddingBottom: 'x-small' }}>
            Subject: {info.subject}
          </Quark>
          <Quark
            css={{
              color: font.colorSecondary,
              display: displayExcerpt ? '' : 'none',
            }}
          >
            {info.text}
          </Quark>
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
                color: font.colorMain,
                textAlign: 'end',
                paddingBottom: 'x-small',
              }}
            >
              {info.date}
            </Quark>
            <Quark
              css={{
                color: font.colorSecondary,
                textAlign: 'end',
                paddingBottom: 'xx-small',
              }}
            >
              {info.time}
            </Quark>
            <Quark
              css={{
                color: font.colorSecondary,
                textAlign: 'end',
                paddingBottom: 'x-small',
                display: displayStar ? '' : 'none',
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
          <Quark
            css={{
              color: font.colorSecondary,
              textAlign: 'end',
              display: displayStatus ? '' : 'none',
            }}
          >
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
      <Quark
        css={{
          flex: '2%',
          color: font.colorSecondary,
          textAlign: 'end',
          marginRight: 'medium',
          marginLeft: 'xx-small',
          display: displayMore ? '' : 'none',
        }}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </Quark>
    </Quark>
  );
};
