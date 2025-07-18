import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Messages = ({ message, photo, name }) => {
  let image = '';
  if (message.type == 0) {
    image = (
      <Link to="#" className="media-left photo-table">
        <img className="media-object img-radius img-radius m-t-5" src={`${photo}`} alt={name} />
      </Link>
    );
  }

  let msgClass = [];
  if (message.type === 0) {
    msgClass = [...msgClass, 'chat-menu-content'];
  } else {
    msgClass = [...msgClass, 'chat-menu-reply text-muted'];
  }

  return (
    <React.Fragment>
      <Card
        className="d-flex align-items-start shadow-none mb-0 p-0 chat-messages"
        style={{ flexDirection: 'row', backgroundColor: 'unset', marginTop: '10px' }}
      >
        {image}
        <Card.Body className={msgClass.join(' ')} style={{ padding: 0 }}>
          <div className="">
            <p className="chat-cont">{message.msg}</p>
          </div>
          <p className="chat-time">{message.time}</p>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

Messages.propTypes = {
  message: PropTypes.string,
  photo: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  msg: PropTypes.string,
  time: PropTypes.string
};

export default Messages;
