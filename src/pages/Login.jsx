import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../../firebase-config";
import Logo from "../components/logo";
import LoggedUserPage from "./LoggedUserPage";

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
        <div className="flex flex-col items-center font-nunito container">
          <Logo />
          <form
            onSubmit={formik.handleSubmit}
            className="w-[90%] flex flex-col"
          >
            <h1 className="text-left text-xl mb-4  ">Iniciar sesión</h1>

            <input
              className="h-12 border  p-[10px] rounded-[14px] mb-5 outline-none border-dark focus:border-accent active:border-accent"
              type="text"
              name="email"
              placeholder="Usuario"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />

            <input
              className="h-12 border  p-[10px] rounded-[14px] mb-5 outline-none border-dark focus:border-accent active:border-accent"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
            <button
              className="btn-primary btn-md rounded-[15px] p-4 mb-16 mt-8 flex justify-center items-center"
              type="submit"
            >
              <h1 className="text-center text-sm text-white ">
                Iniciar sesión
              </h1>
            </button>
            <h2 className="text-center text-dark font-normal text-base ">
              ¿No tenés cuenta?
              <Link to={"../signup"} className="font-bold ml-1">
                Registrate
              </Link>
              .
            </h2>
          </form>
          <div className="mt-4 mb-8 h-[1px] bg-grayB w-72"></div>
          <button
            className="h-12 border  p-[10px] rounded-[14px] mb-5 outline-none w-[90%] border-dark flex justify-center items-center gap-4 active:opacity-90 active:bg-gray-200 hover:opacity-85"
            onClick={signWithGoogle}
          >
            <img src="/IconoGoogle.svg" alt="google icon" />
            <p>Iniciar sesión con Google</p>
          </button>
          <button className="h-12 border  p-[10px] rounded-[14px] mb-5 outline-none w-[90%] border-dark flex justify-center items-center gap-4 active:opacity-90 active:bg-gray-200 hover:opacity-85">
            <img src="/iconoFacebook.svg" alt="facebook icon" />

            <p>Iniciar sesión con Facebook</p>
          </button>
        </div>
      )}
    </>
  );
}

export default Login;
