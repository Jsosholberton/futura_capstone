import useProyectos from "../hooks/useProyectos";
import { useEffect } from "react";
import PreviewProyecto from "../components/PreviewProyecto";

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
