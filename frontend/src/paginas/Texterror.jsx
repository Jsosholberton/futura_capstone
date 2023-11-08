import React from 'react';
 // Ajusta la ruta a tu logotipo

const Texterror = () => {
  return (
    <div className="page-container">
      <div className="corner-text">
        <img src={logo} alt="Logotipo" />
        <h2 className="text-5xl italic text-center font-black">
          <span className="text-black">GOT</span>
          <span className="text-red-600">2</span>
          <span className="text-black">D</span>
          <span className="text-red-600">O</span>
        </h2>
      </div>
    </div>
  );
}

export default Texterror;
