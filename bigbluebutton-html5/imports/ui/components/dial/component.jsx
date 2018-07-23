import React, { Component } from 'react';
import { makeCall } from '/imports/ui/services/api';
import PropTypes from 'prop-types';
import ModalBase from '/imports/ui/components/modal/base/component';
import Button from '/imports/ui/components/button/component';
import TextareaAutosize from 'react-autosize-textarea';
import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import Meetings from '/imports/api/meetings';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { styles } from './styles';


const propTypes = {
  intl: intlShape.isRequired,
  closeModal: PropTypes.func.isRequired,
  // isConnecting: PropTypes.bool.isRequired,
  // isConnected: PropTypes.bool.isRequired,
};

const intlMessages = defineMessages({
  closeLabel: {
    id: 'app.audioModal.closeLabel',
    description: 'close audio modal button label',
  },
  callTitleLabel: {
    id: 'app.call.title',
    description: 'Dial a SIP endpint',
  },
});

class DialModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
    };

    const {
      closeModal,
    } = props;

    this.closeModal = closeModal;
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.makeSIPCall = this.makeSIPCall.bind(this);
  }

  handleMessageChange(e) {
    const message = e.target.value;

    this.setState({
      message,
    });
  }

  handleClick(caracter) {
    const message = `${this.state.message}${caracter}`;
    this.setState({ message });
  }

  makeSIPCall() {
    const userId = Auth.userID;
    const User = Users.findOne({ userId });
    const Meeting = Meetings.findOne({ meetingId: User.meetingId });
    const voiceBridge = Meeting.voiceProp.voiceConf;

    makeCall('outboundDialRequestMessage', this.state.message, voiceBridge);
  }

  hangupSIPCall() {
    const userId = Auth.userID;
    const User = Users.findOne({ userId });
    const Meeting = Meetings.findOne({ meetingId: User.meetingId });
    const voiceBridge = Meeting.voiceProp.voiceConf;

    makeCall('hangupDialRequestMessage', this.state.message, voiceBridge);
  }


  renderOptions1() {
    return (
      <span className={styles.audioOptions}>
        <div className="board-row">
          <Button
            className={styles.audioBtn}
            customIcon="1"
            circle
            size="lg"
            onClick={() => this.handleClick('1')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="2"
            circle
            size="lg"
            onClick={() => this.handleClick('2')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="3"
            circle
            size="lg"
            onClick={() => this.handleClick('3')}
          />
        </div>
      </span>
    );
  }

  renderOptions2() {
    return (
      <span className={styles.audioOptions}>
        <div className="board-row">
          <Button
            className={styles.audioBtn}
            customIcon="4"
            circle
            size="lg"
            onClick={() => this.handleClick('4')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="5"
            circle
            size="lg"
            onClick={() => this.handleClick('5')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="6"
            circle
            size="lg"
            onClick={() => this.handleClick('6')}
          />
        </div>
      </span>
    );
  }

  renderOptions3() {
    return (
      <span className={styles.audioOptions}>
        <div className="board-row">
          <Button
            className={styles.audioBtn}
            customIcon="7"
            circle
            size="lg"
            onClick={() => this.handleClick('7')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="8"
            circle
            size="lg"
            onClick={() => this.handleClick('8')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="9"
            circle
            size="lg"
            onClick={() => this.handleClick('9')}
          />
        </div>
      </span>
    );
  }

  renderOptions4() {
    return (
      <span className={styles.audioOptions}>
        <div className="board-row">
          <Button
            className={styles.audioBtn}
            customIcon="*"
            circle
            size="lg"
            onClick={() => this.handleClick('*')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="0"
            circle
            size="lg"
            onClick={() => this.handleClick('0')}
          />
          <Button
            className={styles.audioBtn}
            customIcon="#"
            circle
            size="lg"
            onClick={() => this.handleClick('#')}
          />
        </div>
      </span>
    );
  }

  renderOptions5() {
    const {
      join,
    } = this.props;

    return (
      <span className={styles.audioOptions}>
        <div className="board-row">
          <Button
            className={styles.audioBtn}
            icon="circle_close"
            circle
            size="lg"
            onClick={this.closeModal}
          />
          <Button
            className={styles.callBtn}
            color={join ? 'danger' : 'primary'}
            icon={join ? 'audio_off' : 'audio_on'}
            circle
            size="lg"
            onClick={join ? this.hangupSIPCall : this.makeSIPCall}
          />
        </div>
      </span>
    );
  }

  renderTextBox() {
    const {
      chatAreaId,
    } = this.props;
    return (
      <span className={styles.audioOptions}>
        <div className="board-row">
          <TextareaAutosize
            className={styles.input}
            id="message-input"
            innerRef={ref => (this.textarea = ref)}
            aria-controls={this.props.chatAreaId}
            autoCorrect="off"
            autoComplete="off"
            spellCheck="true"
            value={this.state.message}
            onChange={this.handleMessageChange}
            onKeyDown={this.handleMessageKeyDown}
          />
        </div>
      </span>
    );
  }

  render() {
    const {
      intl,
    } = this.props;

    return (
      <span>
        <ModalBase
          overlayClassName={styles.overlay}
          className={styles.modal}
          onRequestClose={this.closeModal}
        >
          <header
            data-test="audioModalHeader"
            className={styles.header}
          >

            <h3 className={styles.title}>
              {
                intl.formatMessage(intlMessages.callTitleLabel)
              }
            </h3>

            <Button
              data-test="modalBaseCloseButton"
              className={styles.closeBtn}
              label={intl.formatMessage(intlMessages.closeLabel)}
              icon="close"
              size="md"
              hideLabel
              onClick={this.closeModal}
            />
          </header>

          <div className={styles.content}>
            {this.renderTextBox()}
          </div>
          <div className={styles.content}>
            {this.renderOptions1()}
          </div>
          <div className={styles.content}>
            {this.renderOptions2()}
          </div>
          <div className={styles.content}>
            {this.renderOptions3()}
          </div>
          <div className={styles.content}>
            {this.renderOptions4()}
          </div>
          <div className={styles.content}>
            {this.renderOptions5()}
          </div>
        </ModalBase>
      </span>
    );
  }
}

DialModal.propTypes = propTypes;

export default injectIntl(DialModal);
