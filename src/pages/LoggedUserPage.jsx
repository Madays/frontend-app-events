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
      <div className="avatar-user">
        {currentUser?.photoURL ? (
          <img src={currentUser?.photoURL} />
        ) : (
          <div className="avatar-user-default"></div>
        )}
      </div>
      <h1 className="msg-bienvenida">Bienvenido</h1>
      <h1 className="user-email"> {currentUser.email}</h1>
      <button className="cerrar-sesion" onClick={logOut}>
        Cerrar Sesion
      </button>
    </div>
  );
}
