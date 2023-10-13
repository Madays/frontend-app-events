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
      password: "",
      telefono: "",
      genero: "",
    },

    onSubmit: ({ email, password }) => {
      createNewUser(email, password);
      formik.resetForm();
      navigate("/login");
    },
  });

  return (
    <div className="form-container">
      <Logo />
      <form onSubmit={formik.handleSubmit} className="formulario">
        <h1 className="form-title">Registrate</h1>

        <input
          className="input-nombre input-registro"
          type="text"
          name="nombre"
          placeholder="Nombre"
          onChange={formik.handleChange}
          value={formik.values.nombre}
          required
        />
        <input
          className="input-apellido input-registro"
          type="text"
          name="apellido"
          placeholder="Apellido"
          onChange={formik.handleChange}
          value={formik.values.apellido}
          required
        />
        <input
          className="input-email input-registro"
          type="text"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />

        <input
          className="input-password input-registro"
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
        <input
          className="input-telefono input-registro"
          type="text"
          name="telefono"
          placeholder="Telefono"
          onChange={formik.handleChange}
          value={formik.values.telefono}
          required
        />
        <input
          className="input-genero input-registro"
          type="text"
          name="genero"
          placeholder="Genero"
          onChange={formik.handleChange}
          value={formik.values.genero}
          required
        />

        <button className="btn-submit" type="submit">
          <h1 className="btn-submit-text">Registrarse</h1>
        </button>
        <h2 className="form-subtitle">
          Ya tenes cuenta?
          <Link to={"../login"} className="registrate-link">
            Inicia Sesion
          </Link>
          .
        </h2>
      </form>
    </div>
  );
}

export default RegisterPage;
