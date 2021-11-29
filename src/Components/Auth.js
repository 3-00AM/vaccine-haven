import React, {useEffect, useState} from "react";
import firebase from "../config";

export const AuthContext = React.createContext(undefined);

export const AuthProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    })
  }, []);

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}