//Componente temporario para mostrar que el usuario se loguea
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
export default function LoggedUserPage({ currentUser }) {
  const logOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <h1>Bienvenido {currentUser.email}</h1>
      <button onClick={logOut}>Cerrar Sesion</button>
    </div>
  );
}
