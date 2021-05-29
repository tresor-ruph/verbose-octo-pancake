 


   const EmailVerification = (email) => {
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
        return re.test(email);

    }
    const PasswordVerification = (password) => {
        let bol = false;
        if (
          password.length > 6 &&
          /[0-9]/.test(password) &&
          /[A-Z]/.test(password) &&
          /[a-z]/.test(password)
        ) {
          bol = true;
        }
        return bol;
      };

      const UsernameVerification = (username) => {
        let bol = false;
        if ((username.length > 3)&&(username.length <20)) {
          bol = true;
        }
        return bol;
      };

 export {EmailVerification, PasswordVerification, UsernameVerification}
 

