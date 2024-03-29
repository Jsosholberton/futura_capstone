import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EnvioCorreoCandidato = () => {
  const { id } = useParams();

  const [cargando, setCargando] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);

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
        `https://futura-capstone-sadp.vercel.app/api/candidates/send-email/${id}`,
        config
      );
      setResponse(data.msg);
    } catch (error) {
      setResponse(error.message); // Actualizar response con el mensaje de error
      setError(true);
    }
    setCargando(false);
  };

  return cargando ? (
    <div className="flex justify-center items-center h-screen mx-auto">
      <div className="animate-spin rounded-full border-t-4 border-black-500 border-solid h-16 w-16 mx-auto"></div>
    </div>
  ) : error ? (
    <>
      <div className="py-14 rounded-xl p-10  shadow w-1/2 mx-auto backdrop-blur-sm bg-white/10">
        <h1 className="font-error text-5xl font-sans">
          <b>Something is wrong! <br></br> :(</b>
        </h1>
        <p className="text-white text-2xl pt-10 font-sans">{response}</p>
      </div>
    </>
  ) : (
    <div className="py-14 rounded-xl p-10  shadow w-1/2 mx-auto backdrop-blur-sm bg-white/10">
      <h1 className="font-light-green text-5xl font-sans">
        <b>Process success! <br></br> :)</b>
      </h1>
      <p className="text-white text-2xl pt-10 font-sans">{response}</p>
    </div>
  );
};

export default EnvioCorreoCandidato;
