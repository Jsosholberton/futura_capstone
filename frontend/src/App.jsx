import{ HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './paginas/Login'
import Nuevopassword from './paginas/Nuevopassword'
import Olvidepassword from './paginas/Olvidepassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Bienvenido from './paginas/Bienvenido'
import Candidato from './paginas/Candidato'
import EnvioCorreoCandidato from './paginas/EnvioCorreoCandidato'
import EnvioCorreoCompania from './paginas/EnvioCorreoCompania'

import {AuthProvider} from './context/AuthProvider'
import {CandidatosProvider} from "./context/CandidatosProvider"

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <CandidatosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='olvidepassword' element={<Olvidepassword />} />
            <Route path='olvidepassword/:token' element={<Nuevopassword />} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/home" element={<RutaProtegida />}>
              <Route index element={<Bienvenido />} />
              <Route path=":id" element={<Candidato />} />
              <Route path="enviar-correo/:id" element={<EnvioCorreoCandidato />} />
              <Route path="companias/enviar-correo/:id" element={<EnvioCorreoCompania />} />
            </Route>
          </Routes>
          </CandidatosProvider>
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App
