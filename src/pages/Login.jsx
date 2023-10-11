import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
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

  const signInWithEmail = async (e, email, password) => {
    e.preventDefault();
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
    const { user } = await signInWithPopup(auth, googleProvider);
    console.log(user);

    if (user) {
      const userToken = await user.getIdToken();
      console.log("ID Token:", userToken);
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
            />

            <input
              className="input-password"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <button className="btn-submit" type="submit">
              <h1 className="btn-submit-text">Iniciar sesión</h1>
            </button>
            <h2 className="form-subtitle">
              ¿No tenés cuenta?
              <span className="registrate-link">Registrate</span>.
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
