import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/modal/service';
import DialModal from './component';
// import Service from '../service';

const DialSIPContainer = props => <DialModal {...props} />;


export default withModalMounter(withTracker(({ mountModal }) =>
  (
    {
      closeModal: () => {
        mountModal(null);
      },
    // isConnecting: Service.isConnecting(),
    // isConnected: Service.isConnected(),
    // showPermissionsOvelay: Service.isWaitingPermissions(),
    }))(DialSIPContainer));
