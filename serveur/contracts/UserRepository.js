module.exports = (User) => {


  function getAll() {
    const Users= User.findAll({ where: { email: 'tresor@gmail.com' } })
  }

  return {
  getAll
  }

}