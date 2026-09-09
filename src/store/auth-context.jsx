import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const authEmptyState = {
  jwtToken: null,
  user: null,
  isAuthenticated: false,
};

const authReducer = (prevState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...prevState,
        jwtToken: action.jwtToken,
        user: action.user,
        isAuthenticated: true,
      };
    }
    case LOGOUT: {
      return {
        ...prevState,
        ...authEmptyState,
      };
    }
    default:
      return prevState;
  }
};

export const AuthProvider = ({ children }) => {
  const initialAuthState = () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const user = localStorage.getItem("user");
      if (jwtToken && user) {
        return {
          jwtToken,
          user: JSON.parse(user),
          isAuthenticated: true,
        };
      }
    } catch {
      console.error("Failed to load from localStorage: " + error);
    }
    return authEmptyState;
  };

  const [authState, dispatch] = useReducer(
    authReducer,
    authEmptyState,
    initialAuthState,
  );

  useEffect(() => {
    try {
      if (authState.isAuthenticated) {
        localStorage.setItem("jwtToken", authState.jwtToken);
        localStorage.setItem("user", authState.user);
      } else {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
      }
    } catch {
      console.error("Failed to save to localStorage: " + error);
    }
  }, [authState]);

  const loginSuccess = (jwtToken, user) => {
    dispatch({ type: LOGIN_SUCCESS, jwtToken, user });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext
      value={{
        jwtToken: authState.jwtToken,
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        loginSuccess,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
};
