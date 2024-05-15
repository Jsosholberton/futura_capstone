import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EnvioCorreoCompania = () => {
  const { id } = useParams();

  const [cargando, setCargando] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [contacto, setContacto] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [correoEnviado, setCorreoEnviado] = useState(false);

  useEffect(() => {
    enviarCorreo(id);
  }, [id]);

  const enviarCorreo = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `https://futura-capstone-sadp.vercel.app/api/companies/send-email/${id}`,
        config
      );
      const { text, email, contacto, name } = data;
      setText(text);
      setEmail(email);
      setContacto(contacto);
      setName(name);
    } catch (error) {
      setResponse(error.message);
      setError(true);
    }
    setCargando(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `https://futura-capstone-sadp.vercel.app/api/companies/send-email/${id}`,
        { text, email, contacto, name },
        config
      );
      setCorreoEnviado(true);
    } catch (error) {
      setResponse(error.message);
      setError(true);
    }
  };

  return cargando ? (
    <div className="flex justify-center items-center h-screen mx-auto">
      <div className="animate-spin rounded-full border-t-4 border-black-500 border-solid h-16 w-16 mx-auto"></div>
    </div>
  ) : error ? (
    <>
      <div className="py-14 rounded-xl p-10  shadow w-1/2 mx-auto backdrop-blur-sm bg-white/10">
        <h1 className="font-error text-5xl font-sans">
          <b>
            Something is wrong! <br></br> :(
          </b>
        </h1>
        <p className="text-white text-2xl pt-10 font-sans">{response}</p>
      </div>
    </>
  ) : correoEnviado ? (
    <div className="py-8 rounded-xl p-6 md:p-10 shadow mx-auto backdrop-blur-sm bg-white/10">
      <h1 className="font-light-green text-4xl md:text-5xl font-sans">
        <b>
          Email send success<br></br> :)
        </b>
      </h1>
    </div>
  ) : (
    <div className="py-8 rounded-xl p-6 md:p-10 shadow mx-auto backdrop-blur-sm bg-white/10">
      <h1 className="font-light-green text-4xl md:text-5xl font-sans">
        <b>
          Review the email<br></br> :)
        </b>
      </h1>
      <div className="w-full md:w-auto">
        <form className="mt-4" onSubmit={handleSubmit}>
          <label
            className="uppercase text-[#d8d6d6] font-thin italic block text-base md:text-lg font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full py-2 px-3 border rounded-md mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label
            className="uppercase text-[#d8d6d6] font-thin italic block text-base md:text-lg font-bold mt-4"
            htmlFor="contact"
          >
            Contact
          </label>
          <input
            id="contact"
            type="text"
            placeholder="Contact"
            className="w-full py-2 px-3 border rounded-md mt-1"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
          ></input>

          <label
            className="uppercase text-[#d8d6d6] font-thin italic block text-base md:text-lg font-bold mt-4"
            htmlFor="company"
          >
            Company Name
          </label>
          <input
            id="company"
            type="text"
            placeholder="Company"
            className="w-full py-2 px-3 border rounded-md mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>

          <label
            className="uppercase text-[#d8d6d6] font-thin italic block text-base md:text-lg font-bold mt-4"
            htmlFor="text"
          >
            Preview Email
          </label>
          <textarea
            id="text"
            placeholder="Text"
            className="w-full h-32 py-2 px-3 border rounded-md mt-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className=" 
                    transition-shadow text-sm  opacity-70 hover:opacity-100 rounded-full
                    hover:-translate-y-0.5 hover:duration-1000 bg-gradient-to-r from-[#ffffff] via-[#3d3d3d] to-[#000000] hover:to-[#6c36c4]
                    italic w-52 py-2 mt-4
                    text-white mb-1 uppercase delay-75 font-medium rounded-3xl shadow-inner
                    active:animate-ping pointer-events-auto hover:shadow-[#6c36c4] transition-colors font-thin duration-1000"
          >
            Send email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EnvioCorreoCompania;
