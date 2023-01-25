const membership = require('./../membership/membership');
const mainScene = require('./../main/mainScene');
const getData = require('./../getData/getData');
const adminMenu = require('./../admin/adminMenu');
const sendUser = require('./../admin/sendUser');

module.exports = [
    membership,
    mainScene,
    getData,
    adminMenu,
    sendUser
]
