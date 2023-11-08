import useAuth from "../hooks/useAuth";

const Header = () => {
  const { cerrarSesionAuth } = useAuth();
  const handleCerrarSesion = () => {
    cerrarSesionProyectos();
    cerrarSesionAuth();
    localStorage.removeItem("token");
    // console.log(err)
  };

  return (
    <header className="px-4 py-5 bg-dark-gray ">
      <div className="md:flex md:justify-between items-center">
        <h2 className="text-5xl  text-center text-white">
          auto<span className="font-dark-green">&lt;</span><span className="font-lila">mate</span>
          <span className="font-dark-green">&gt;</span>
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-white text-sm bg-black-950 p-3
                        rounded-xl uppercase font-sans font-medium   cursor-pointer hover:bg-teal-600 active:bg-cyan-500   transition-colors"
            onClick={handleCerrarSesion}
          >
            Close Session
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
