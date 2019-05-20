import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MainStore from '../stores/MainStore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

@observer
class ErrorModal extends Component {

    handleClose = (id, error) => {
        let { page, query, orderBy, searchBy } = MainStore;
        MainStore.removeErrorModal(id);
        if(error === 'Failed to fetch') MainStore.getCards(page, query, orderBy, searchBy);
    };

    getErrorMessage = (error) => {
        let message = 'An error occurred. Please try again';
        switch(error) {
            case '404':
                message = 'The requested resource could not be found';
                break;
            case '403':
                message = 'You exceeded the rate limit';
                break;
            case '500':
                message = 'We had a problem with our server. Please try again later';
                break;
            case '503':
                message = 'Service Unavailable. We are temporarily offline for maintenance. Please try again later';
                break;
            default:
                message = 'An unknown error has occurred.';
        }
        return message;
    };

    render() {
        const { errorModals } = MainStore;

        return (
            <span>
         {errorModals.length ?
                errorModals.map(m => {
                    return <Dialog
                        open={true}
                        onClose={() => this.handleClose(m.id)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{this.getErrorMessage(m.error)}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {`Error code: ${m.error}`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined"
                                    onClick={() => this.handleClose(m.id, m.error)}
                                    color="primary"
                            >
                                Dismiss
                            </Button>
                        </DialogActions>
                    </Dialog>
                }) :
                null
            }
            </span>
        );
    }
}

ErrorModal.propTypes = {
    errorModals: PropTypes.array
};

export default ErrorModal;