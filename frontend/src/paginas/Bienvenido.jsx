import useProyectos from "../hooks/useCandidatos";
import { useEffect } from "react";

const Proyectos = () => {
  // const { proyectos } = useProyectos();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
     <div>
      Bienvenido
     </div>
    </>
  );
};

export default Proyectos;
