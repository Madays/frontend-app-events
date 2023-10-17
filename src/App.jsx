import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase-config";

import "./App.css";

import Login from "./pages/Login";
import LandingPage from "./pages/landingPage";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    //Esto verifica que el usuario este logueado cada vez que monta el componente
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      <Login currentUser={user} />
      <LandingPage />
    </>
  );
}

export default App;
