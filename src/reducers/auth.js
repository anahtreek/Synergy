let defaultRole = 'Candidate';

if (window.matchMedia('(max-width: 768px)').matches) {
  defaultRole = 'Candidate';
}

const roleProfileMap = {
  Candidate: { label: 'Candidate', value: 'Candidate' },
  CL: { label: 'CL', value: 'Candidate Login' },
};

const defaultState = {
  authenticated: false,
  loginFailed: false,
  logined: false,
  profile: roleProfileMap[defaultRole],
};


export default (state = defaultState, action) => {
  switch (action.type) {
    case 'AUTH_CHECK_STARTED':
      return { ...state, authCheckStarted: true };
    case 'AUTH_FAILED':
      return { ...state, authCheckStarted: false, authFailed: true };
    case 'LOGIN_STARTED':
      return { ...state, loginStarted: true, loader: true, candidate: true };
    case 'LOGIN_FAILED':
      return { ...state, 
        // loginStarted: false, 
        // loginFailed: true, 
        loader: false, 
        profile: roleProfileMap[action.payload.role],
        output: action.payload.output
      };
    case 'DISMISS_ERROR':
      return { ...state, loginFailed: false };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loginStarted: false,
        authCheckStarted: false,
        authFailed: false,
        loginFailed: false,
        user: action.payload,
        authenticated: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        // loginStarted: false,
        // authCheckStarted: false,
        // authFailed: false,
        // loginFailed: false,
        user: action.payload.role == "CL"? "": action.payload.user,
        output: action.payload.output,        
        // authenticated: true,
        // logined: true,
        loader: false,
        profile: roleProfileMap[action.payload.role],
      };
    case 'LOGOUT':
      return null; //{ ...state, user: null, authenticated: false, logined: false };
    case 'SWITCH_PROFILE':
      return { ...state, profile: action.payload };
    case 'USER_ROLES_FETCH_STARTED':
      return { ...state, loggedUser: action.payload };
    case 'USER_ROLES_FETCH_DONE': {
      var pl = action.payload;
      var defaultLogin = {};
      if(pl){
        defaultLogin = pl.roles[0];
      }else{
        defaultLogin = { label: 'CPC', value: 'Campus Placement Coordinator' };
      }
      return { 
        ...state, 
        userAccessData: pl, 
        profile: defaultLogin,
        loggedUser: pl.userId
      };
    }
    case 'CLEAR_THIS_DATA_IN_AUTH':
      return { ...state, [action.payload]: null };
    case 'LOGIN_ACTIONS_STARTED':
      return { ...state, loader: true, action: action.payload };
    case 'LOGIN_ACTIONS_FINISHED':
      return { ...state, 
        loader: false, 
        user: action.payload.role == "CL"? "": action.payload.user,
        output: action.payload.output, 
        profile: roleProfileMap[action.payload.role] 
      };
    case 'CURRENT_ACTION':
      return { ...state, action: action.payload, profile: roleProfileMap['CL'] };
    default:
      return state;
  }
};
