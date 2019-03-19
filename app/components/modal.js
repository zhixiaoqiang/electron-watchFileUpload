import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  render() {
    let { open = false, handleClose, children, title, onOk, okText } = this.props
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title || '提示'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {children}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
              Disagree
            </Button> */}
            <Button onClick={onOk || handleClose} color="primary" autoFocus>
              {okText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
