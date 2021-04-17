import React from 'react'
import { Button, Alert } from "react-bootstrap";

const ResetPasswordUI =(props) =>{
    const {
      MainHeader,
        notif,
        variant,
        setNotif,
        notifMess,
        email,
        handleEmail,
        handleReset,
        password1,
        handlePassword1,
        password2,
        handlePassword2,
        updatePassword,
        reset,
    } =props

    return(
        <div className='reset-passwd'>
        {MainHeader}
        {notif && (
          <Alert variant={variant}>
            <button
              aria-hidden={true}
              className="close"
              data-dismiss="alert"
              type="button"
              onClick={() => setNotif(false)}
            >
              <i className="nc-icon nc-simple-remove"></i>
            </button>
            <div className='notifText'>{notifMess}</div>
          </Alert>
        )}
        {reset ? (
          <div className="main-div">
            <div className="center-div">
              <div>
                <p className="text-res">Forgot your Password ?</p>
                <span>
                  To reset your password please provide your account email Address
                </span>
              </div>
  
              <input
                type="text"
                placeholder="enter your email"
                value={email}
                className="email-res"
                onChange={(event) => handleEmail(event)}
              />
              <br />
              <Button
                className="btn-fill pull-right"
                type="submit"
                variant="info"
                onClick={() => handleReset()}
              >
                Reset Password
              </Button>
            </div>
          </div>
        ) : (
          <div className="main-div">
            <div className="center-div">
              <div>
                <p className="text-res">Update your Password</p>
                <span>Please enter your new password</span>
              </div>
              <input
                type="password"
                placeholder="password"
                className="email-res"
                value={password1}
                onChange={(event) => handlePassword1(event)}
              />
              <br />
              <input
                type="password"
                placeholder="repeat password"
                className="email-res2"
                value={password2}
                onChange={(event) => handlePassword2(event)}
              />
              <br />
              <Button
                className="btn-fill pull-right"
                type="submit"
                variant="info"
                onClick={() => updatePassword()}
              >
                Update password
              </Button>
            </div>
          </div>
        )}
      </div>
    )
}

export default ResetPasswordUI