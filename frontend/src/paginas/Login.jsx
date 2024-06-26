import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import axios from 'axios';
import useAuth from "../hooks/useAuth";


const Login = () => {
  // Definición de estados locales para email, password y alertas
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  // Obtiene la función setAuth del contexto de autenticación
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica si el email o la contraseña están vacíos
    if ([email, password].includes("")) {
      setAlerta({
        msg: "All fields are required",
        error: true,
      });
      return;
    }
    try {
      // Envía la solicitud de inicio de sesión al servidor
      const { data } = await axios.post(
        "https://futura-capstone-sadp.vercel.app/api/users/login",
        { email, password }
      );

      // Almacena el token en el almacenamiento local y establece la autenticación
      localStorage.setItem('token', data.token)
      setAuth(data)
      // Redirige al usuario a la página de proyectos
      navigate('/home');
    } catch (error) {
      // Maneja los errores de inicio de sesión
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  // Extrae el mensaje de alerta del estado
  const { msg } = alerta;

  return (
    <div className="page-container">
      <div className="corner-text fixed top-0 my-14 mx-8">
        <h2 className="font-titan text-5xl  text-center text-white">
          auto<span className="font-dark-green">&lt;</span><span className="font-lila">mate</span>
          <span className="font-dark-green">&gt;</span>
        </h2>
      </div>
      {/* Renderiza la alerta si existe */}
      {msg && <Alerta alerta={alerta} />}

      <form
        className="delay-100 opacity-80 custom-shadow
        hover:opacity-100 hover:scale-30 translate-x-0.2 skew-x-1 
        md:transform-none hover:-translate-y-0.2 
        hover:shadow-lg duration-700 hover:shadow-[#6c36c4]
        bg-gradient-to-br from-[#784fba] from-1% via-[#755d98] via-50% to-[#ffffff]
        rounded-3xl p-1"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-[#d8d6d6] font-thin italic block text-lg font-bold"
            htmlFor="email"
          >
            Email
          </label>
          {/* Campo de entrada de email */}
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="hover:translate-x-0.1  hover:duration-700 opacity-80 hover:opacity-100 mt-1 p-1 rounded-l-none hover:-translate-y-0.5 duration-700 shadow-inner italic shadow shadow-[#000000] rounded-xl 
              bg-gradient-to-r from-[white] via-[#acabab] to-[#ffffff] custom-placeholder
              w-80 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>
        <div className="my-5">
          <label
            className="uppercase italic font-thin text-[#d8d6d6] block text-lg font-bold"
            htmlFor="password"
          >
            Password
          </label>
          {/* Campo de entrada de contraseña */}
          <input
            id="PASSWORD"
            type="password"
            placeholder="Password"
            className="w-80  hover:translate-x-0.5 opacity-80 hover:opacity-100 mt-1 rounded-l-none p-1 hover:-translate-y-0.5 duration-700 shadow-inner italic shadow-[#000000] rounded-xl 
            bg-gradient-to-r from-[white] via-[#acabab] to-[#ffffff] custom-placeholder"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Botón de inicio de sesión */}
        <button
          type="submit"
          className=" 
          transition-shadow text-sm  opacity-70 hover:opacity-100 rounded-full
          hover:-translate-y-0.5 hover:duration-1000 bg-gradient-to-r from-[#ffffff] via-[#3d3d3d] to-[#000000] hover:to-[#6c36c4]
          italic w-52 py-1.5
          text-white mb-1 uppercase delay-75 font-medium rounded-3xl shadow-inner
          active:animate-ping pointer-events-auto hover:shadow-[#6c36c4] transition-colors font-thin duration-1000"
        >
          Login
        </button>
      </form>

      <nav className="lg:flex lg:justify-between">
        {/* Enlace para registrar una cuenta */}
        <Link
          className="delay-75 opacity-90 hover:skew-x-1 hover:opacity-100 shadow-lg p-2 hover:shadow-white shadow-black-950 rounded-full block duration-500 text-center hover:-translate-y-0.5 my-6 mx-6 text-[#ffffff] uppercase text-sm"
          to="/registrar" // Reemplaza con la ruta correcta
        >
          Don't have an account? Sign up
        </Link>

        {/* Enlace para recuperar contraseña */}
        <Link
          className="delay-75 opacity-90 hover:skew-x-1 hover:opacity-100 block duration-500 hover:-translate-y-0.5 text-center my-7 mx-2 text-[#ffffff] shadow-lg  hover:shadow-white shadow-black-950 rounded-full uppercase text-sm"
          to="/olvidepassword" // Reemplaza con la ruta correcta
        >
          Forgot your password?
        </Link>
      </nav>
    </div>
  );
};

export default Login;
