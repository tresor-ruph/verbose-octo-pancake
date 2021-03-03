/* eslint-disable linebreak-style */
const User = require('../domain/Users');

module.exports = (UserRepository) => {
  async function execute(email, password, userName) {
    const user = await UserRepository.getByEmail(email);

    // validate schema
    if (!email || !password || !userName) {
      throw new Error('validate failed');
    }

    // check if user exist
    if (user) {
      throw new Error('email already exist in the system');
    }

    let newUser = new User(email, password, userName);
    //add user
    newUser = await UserRepository.add(newUser);

    return 'user added succesfully';
  }
  return {
    execute,
  };
};
