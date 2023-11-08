import { useContext } from "react"
import CandidatosContext from "../context/CandidatosProvider"

const useCandidatos = () => {
    return useContext(CandidatosContext)
}

export default useCandidatos