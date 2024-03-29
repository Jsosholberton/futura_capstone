import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CandidatosContext = createContext();

const CandidatosProvider = ({ children }) => {
  const [alerta, setAlerta] = useState({});
  const [candidato, setCandidato] = useState({});
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);

    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  const cerrarSesionCandidato = () => {
    setCandidato({});
    setCargando(false);
    setAlerta({});
  };

  const obtenerCandidato = async (id) => {
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
      const { data } = await axios(
        `http://localhost:4000/api/candidates/process/${id}`,
        config
      );
      setCandidato(data.properties);
    } catch (error) {
      // console.log(error);
      setCandidato({error:error.response.data})
    }
    setCargando(false);
  };

  return (
    <CandidatosContext.Provider
      value={{
        cerrarSesionCandidato,
        mostrarAlerta,
        alerta,
        obtenerCandidato,
        candidato,
        cargando,
      }}
    >
      {children}
    </CandidatosContext.Provider>
  );
};
export { CandidatosProvider };

export default CandidatosContext;
