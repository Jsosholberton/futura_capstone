import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useCandidatos from "../hooks/useCandidatos";

const Candidato = () => {
  const params = useParams();

  const { obtenerCandidato, candidato, cargando } = useCandidatos();

  useEffect(() => {
    obtenerCandidato(params.id);
  }, []);

  const { Nombre, error } = candidato;

  const nombre = Nombre ? Nombre.title[0].plain_text : null;

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
        <p className="text-white text-2xl pt-10 font-sans">{error}</p>
        <button
            type="button"
            className="text-white text-sm bg-black-950 mt-20 p-3
                        rounded-xl uppercase font-sans font-medium   cursor-pointer hover:bg-teal-600 active:bg-cyan-500   transition-colors" 
          >
            Retry
          </button>
      </div>
    </>
  ) : (
    <div className="py-14 rounded-xl p-10  shadow w-1/2 mx-auto backdrop-blur-sm bg-white/10">
      <h1 className="font-light-green text-5xl font-sans">
        <b>Process success <br></br> :)</b>
      </h1>
      <p className="text-white text-2xl pt-10 font-sans">The candidate {nombre} has updated, check Notion for view datails</p>
    </div>
  );
};

export default Candidato;
