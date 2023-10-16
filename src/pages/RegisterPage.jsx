import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import Logo from "../components/logo";

function RegisterPage() {
  const navigate = useNavigate();
  const createNewUser = async (email, password) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(user);
  };
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      nombreUsuario: "",
      password: "",
    },

    onSubmit: ({ email, password }) => {
      createNewUser(email, password);
      formik.resetForm();
      navigate("/login");
    },
  });

  return (
    <div className="container font-nunito">
      <form
        onSubmit={formik.handleSubmit}
        className="w-[90%] flex flex-col gap-4"
      >
        <h1 className="text-left text-xl mb-4">Registrate</h1>

        <input
          className="border  p-[10px] rounded-[14px] h-12 outline-none border-dark focus:border-accent active:border-accent"
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={formik.handleChange}
          value={formik.values.nombre}
          required
        />
        <input
          className="h-12 border  p-[10px] rounded-[14px] outline-none border-dark focus:border-accent active:border-accent"
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={formik.handleChange}
          value={formik.values.apellido}
          required
        />
        <input
          className="h-12 border  p-[10px] rounded-[14px] outline-none border-dark focus:border-accent active:border-accent "
          type="text"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />
        <input
          className="h-12 border  p-[10px] rounded-[14px] outline-none border-dark focus:border-accent active:border-accent"
          type="text"
          name="nombreUsuario"
          placeholder="Nombre de usuario"
          onChange={formik.handleChange}
          value={formik.values.nombreUsuario}
          required
        />

        <input
          className="h-12 border  p-[10px] rounded-[14px] outline-none border-dark focus:border-accent active:border-accent"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />

        <button
          className="btn-primary btn-md rounded-[15px] p-4 mb-8 h-12 mt-8 flex justify-center items-center"
          type="submit"
        >
          <h1 className="text-center text-sm text-white">Registrarse</h1>
        </button>
      </form>
      <div className=" mb-8 h-[1px] bg-grayB w-72"></div>
      <button className="h-12 border  p-[10px] rounded-[14px] mb-5 outline-none w-[90%] border-dark flex justify-center items-center gap-4 active:opacity-90 active:bg-gray-200 hover:opacity-85">
        <img src="/IconoGoogle.svg" alt="google icon" />
        <p>Iniciar sesión con Google</p>
      </button>
      <button className="h-12 border  p-[10px] rounded-[14px] mb-5 outline-none w-[90%] border-dark flex justify-center items-center gap-4 active:opacity-90 active:bg-gray-200 hover:opacity-85">
        <img src="/iconoFacebook.svg" alt="facebook icon" />

        <p>Iniciar sesión con Facebook</p>
      </button>
    </div>
  );
}

export default RegisterPage;
