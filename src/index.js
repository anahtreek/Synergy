/* eslint react/prop-types: 0 */
/* eslint react/jsx-filename-extension:0 */
import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import allReducers from './reducers';
import Authenticator from './Authenticator';
import Constants from './constants.json';

import './styles/_breakpoints.css';
import './styles/styles.css';
import './styles/_grid.css';
import './styles/_buttons.css';
import './styles/_tables.css';

import routes from './routes';

const middlewares = [thunk];

//Disable Developer Console View
document.addEventListener("keydown", keyDownFilter, false);
document.addEventListener("contextmenu", contextMenuFilter, false);

function contextMenuFilter(e) {
  e.preventDefault();
}

function keyDownFilter(e) {
  if (e.keyCode == 123) { // Prevent F12
    e.preventDefault();
  } else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) { // Prevent Ctrl+Shift+I        
    e.preventDefault();
  } else if (e.ctrlKey && e.shiftKey && e.keyCode == 74) { // Prevent Ctrl+Shift+J        
    e.preventDefault();
  } else if (e.ctrlKey && e.shiftKey && e.keyCode == 75) { // Prevent Ctrl+Shift+K        
    e.preventDefault();
  }
}

// Only use the redux-logger middleware in development
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

const persistedState = loadStateFromLocalStorage();

const store = createStore(allReducers, persistedState, applyMiddleware(...middlewares));

store.subscribe(() => loadState2LocalStorage(store.getState()));

function loadState2LocalStorage(state) {
  try{
    if(state && (state).auth 
        && (state).auth.userAccessData){
    localStorage.setItem("state", JSON.stringify(state));
    }
  }catch(exp){
    console.log("loadState2LocalStorage : ", exp);
  }
}

function loadStateFromLocalStorage() {
  try{
    if(localStorage.getItem("state"))
      return JSON.parse(localStorage.getItem("state"))
    else
      return undefined;
  }catch(exp){
    console.log("loadStateFromLocalStorage : ", exp);
  }
}

function timeoutSetup() {
  this.addEventListener("mousemove", resetTimer, false);
  this.addEventListener("mousedown", resetTimer, false);
  this.addEventListener("keypress", resetTimer, false);
  this.addEventListener("keyup", resetTimer, false);
  this.addEventListener("keydown", resetTimer, false);
  this.addEventListener("DOMMouseScroll", resetTimer, false);
  this.addEventListener("mousewheel", resetTimer, false);
  this.addEventListener("touchmove", resetTimer, false);
  this.addEventListener("MSPointerMove", resetTimer, false);
  startTimer();
}

function startTimer() {
  // wait 1 minute before calling goInactive
  timeoutID = window.setTimeout(goInactive, 1800000);
}

function resetTimer(e) {
  window.clearTimeout(timeoutID);
  goActive();
}

function goActive() { 
  startTimer();
}

function goInactive() {
  store.dispatch({ type: 'LOGOUT' });
  window.localStorage.clear();
  window.location.href = Constants.urls.logout;
}

timeoutSetup();

// Helpe function that reders single route
const renderRoute = (route, props) => {
  window.scrollTo(0, 0); // Reset scroll to top
  return (
    <Authenticator currentRoute={route.path} className={route.className}>
      <Helmet>
        <title>{route.title}</title>
        <meta name="description" content={route.description} />
        <meta name="keywords" content={route.keywords} />
      </Helmet>
      <route.component routeParams={props.match.params} />
    </Authenticator>
  );
};

// Helper function to extract basename from PUBLIC_URL environment variable
const getBasename = () => {
  const ele = document.createElement('a');
  ele.href = process.env.PUBLIC_URL;
  const basename = ele.pathname;
  if (basename && basename[basename.length - 1] === '/') {
    return basename.slice(0, -1);
  }
  return basename;
};

// Helper function that create all routes
const createRoutes = () => routes.map(route => (
  <Route
    exact
    key={route.path}
    path={route.path}
    component={props => renderRoute(route, props)}
  />
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={getBasename()}>
      <div>
        {createRoutes()}
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// Only use caching for faster loading in production
if (process.env.NODE_ENV !== 'development') {
  registerServiceWorker();
}
