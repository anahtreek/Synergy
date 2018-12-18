/**
 * Authentication service
 */
import Cookies from 'universal-cookie';
import { omit, find, pick } from 'lodash';
import mockUsers from '../data/users.json';
import Axios from 'axios';
import Services from './services.json';

const cookies = new Cookies();

/**
 * Check if user is authenticated
 * @param {function} cb - The callback function
 */
function checkAuth(cb) {
  const userDetails = cookies.get('userDetails');
  if (!userDetails) {
    cb(new Error());
  } else {
    cb(null, omit(find(mockUsers, u => u.username === userDetails.username), ['password']));
  }
}

/**
 * Login
 * @param {object} credentials - The login credentials {username, password}
 * @param {function} cb - The callback function
 */
function login(credentials, cb) {
  const user = find(mockUsers, u => (
    u.username === credentials.username && u.password === credentials.password
  ));
  if (!user) {
    cb(new Error());
  } else {
    cookies.set('userDetails', JSON.stringify(pick(credentials, ['username'])), { path: '/' });
    cb(null, omit(user, ['password']));
  }
}

/**
 * Logout user by removing the cookies
 * @param {function} cb - The callback function
 */
function logout() {
  // cookies.remove('userDetails', { path: '/' });
  // cb();
  Axios({
    method: Services.methods.post,
    url: Services.urls.serviceUrl + Services.services.cd.login,
    data: {
      "input": {
        "opr": "logout"
      }
    },
    headers: Services.requestHeaders
  }).then((response) => {
    console.log("response: ", response);
  }).catch((error) => {
    console.log("error: ", error);
  });
}

function getUserAccessData(loggedUser, cb) {
  Axios({
    method: Services.methods.post,
    url: Services.urls.serviceUrl + Services.services.roles,
    data: {"input": { "token": loggedUser} },
    headers: Services.requestHeaders
  }).then((response) => {
    var output = response.data.output.data;
    // var urls = output.urls;
    // var roleUrls = {};
    // urls.map((url) => {
    //   return roleUrls[url.title] = url.url;
    // });
    // output.roleUrls = roleUrls;
    cb(output);
  }).catch((error) => {
    cb();
	});
}

function submitLoginActions(credentials, cb) {
  Axios({
    method: Services.methods.post,
    url: Services.urls.serviceUrl + Services.services.cd.login,
    data: {
      "input": {
        "opr": credentials.action,
        "username": credentials.username,
        "password": credentials.password,
        "newPassword": credentials.newPassword,
        "confirmPassword": credentials.confirmPassword,
        "emailId": credentials.emailId,
        "newEmailId": credentials.newEmailId,
        "dob": credentials.dob
      }
    },
    headers: Services.requestHeaders
  }).then((response) => {
    var output = response.data.output;
    if(output.status == "success")
      output.status = "Y";
    cb({ 
      user: credentials.username, output, role: (output.status == "Y" 
      && (credentials.action == 'login' || !credentials.action))? 'Candidate': 'CL' 
    });
  }).catch((error) => {
    cb({ 
      user: "", 
      output: { status: "N", message: "Network Issue, Please try later.." }, 
      role: 'CL' 
    });
  });
}

export default {
  checkAuth,
  login,
  logout,
  getUserAccessData,
  submitLoginActions
};
