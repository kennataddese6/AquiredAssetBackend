require("dotenv").config();
const ActiveDirectory = require("activedirectory2");
const adConfig = {
  url: process.env.LDAP_HOST,
  baseDN: process.env.LDAP_BASE_DN,
  username: process.env.LDAP_USERNAME,
  password: process.env.LDAP_PASSWORD,
  port: process.env.LDAP_PORT,
};

const ad = new ActiveDirectory(adConfig);
module.exports = ad;
