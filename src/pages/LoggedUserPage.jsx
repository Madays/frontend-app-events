//Componente temporario para mostrar que el usuario se loguea
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import "./loggedUserPage.css";
export default function LoggedUserPage({ currentUser }) {
  const logOut = () => {
    signOut(auth);
  };
  return (
    <div className="container">
      <div className="container-text">
        <h1>Bienvenido</h1>
        <h1> {currentUser.email}</h1>
        <button onClick={logOut}>Cerrar Sesion</button>
      </div>
    </div>
  );
}
