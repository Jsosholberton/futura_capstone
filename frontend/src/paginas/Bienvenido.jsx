import useProyectos from "../hooks/useCandidatos";
import { useEffect } from "react";

const Proyectos = () => {
  // const { proyectos } = useProyectos();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
    <div className="py-14 rounded-xl p-10  shadow w-1/2 mx-auto backdrop-blur-sm bg-white/10">
     <h1 className="font-light-green text-5xl font-sans">
        <b>Welcome <br></br> to </b><span className="text-white">auto</span><span className="text-[#008065]">&lt;</span><span className="text-[#7B50C2]">mate</span><span className="text-[#008065]">&gt;</span>
        
     </h1> 
    </div>
    </>
  );
};

export default Proyectos;