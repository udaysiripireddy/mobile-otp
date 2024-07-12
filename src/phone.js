import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider } from './firebase.config';
import { signInWithCredential } from 'firebase/auth';
import './phone.css';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Phone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [open, setOpen] = useState(false);

  const requestOtp = () => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log("response", response);
      },
      'expired-callback': () => {}
    });
    const mobileNumber = `+91${phoneNumber}`;
    signInWithPhoneNumber(auth, mobileNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
        console.log(phoneNumber);
        console.log("confirmationresult", confirmationResult);
        setOpen(true); // Open the dialog when OTP is sent
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber:", error);
      });
  };
  
  const verifyOtp = () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    console.log(credential);
    signInWithCredential(auth, credential)
      .then((result) => {
        console.log("User signed in successfully:", result);
        alert("Sign in successful");
        setOpen(false); // Close the dialog on successful verification
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Phone Number Verification</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone number"
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={requestOtp}>
        Send OTP
      </button>
      <div id="recaptcha-container" className="mt-3"></div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="OTP"
            type="text"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={verifyOtp} color="primary">
            Verify OTP
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Phone;
