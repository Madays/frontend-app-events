import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../../firebase-config";
import Logo from "../components/logo";
import LoggedUserPage from "./LoggedUserPage";
import "./login.css";

function Login({ currentUser }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      signInWithEmail(email, password);
    },
  });

  const signInWithEmail = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        const userToken = await user.getIdToken();
        console.log("ID Token:", userToken);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const signWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      console.log(user);
      if (user) {
        //Esto seria el token que tenemos que mandar al back
        const userToken = await user.getIdToken();
        console.log("ID Token:", userToken);
      }
    } catch (error) {
      console.log("Error al logearse ");
    }
  };

  return (
    <>
      {currentUser ? (
        <LoggedUserPage currentUser={currentUser} />
      ) : (
        <div className="form-container">
          <Logo />
          <form onSubmit={formik.handleSubmit} className="formulario">
            <h1 className="form-title">Iniciar sesión</h1>

            <input
              className="input-email"
              type="text"
              name="email"
              placeholder="Usuario"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />

            <input
              className="input-password"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
            <button className="btn-submit" type="submit">
              <h1 className="btn-submit-text">Iniciar sesión</h1>
            </button>
            <h2 className="form-subtitle">
              ¿No tenés cuenta?
              <Link to={"../signup"} className="registrate-link">
                Registrate
              </Link>
              .
            </h2>
          </form>
          <div className="separador"></div>
          <button className="btn-google" onClick={signWithGoogle}>
            Iniciar sesión con Google
          </button>
          <button className="btn-facebook">Iniciar sesión con Facebook</button>
        </div>
      )}
    </>
  );
}

export default Login;
