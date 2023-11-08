import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import useCandidatos from '../hooks/useCandidatos';

const Candidato = () => {

    const params = useParams();

    const { obtenerCandidato, candidato, cargando } = useCandidatos();

    useEffect(() => {
        obtenerCandidato(params.id)
    }, [])

    // const { name, deadLine, description, client } = 
     console.log(candidato);
  return (
    cargando ? (
  
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-t-4 border-black-500 border-solid h-16 w-16"></div>
    </div>
  ) : (
    <>
   <div>hola</div>
  </>
    )
  )
}

export default Candidato