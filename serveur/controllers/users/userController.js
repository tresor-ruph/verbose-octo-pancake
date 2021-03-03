// const express = require('express');

const listAllUsers = require('./../../use_cases/');
module.exports = (dependencies) => {
  const listUsers = listAllUsers(dependencies)
  return { listUsers }
}

const userService = require('./../../use_cases')
exports.listAllUsers = dependencies => {
  userService(dependencies);
}