import{ BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import RutaProtegida from './layouts/RutaProtegida'

import Login from './paginas/Login'
import Nuevopassword from './paginas/Nuevopassword'
import Olvidepassword from './paginas/Olvidepassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import Bienvenido from './paginas/Bienvenido'
import Procesar from './paginas/Candidato'

import {AuthProvider} from './context/AuthProvider'
import {ProyectosProvider} from "./context/ProyectosProvider"

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='olvidepassword' element={<Olvidepassword />} />
            <Route path='olvidepassword/:token' element={<Nuevopassword />} />
            <Route path='confirmar/:id' element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/home" element={<RutaProtegida />}>
              <Route index element={<Bienvenido />} />
              <Route path=":id" element={<Procesar />} />
            </Route>
          </Routes>
          </ProyectosProvider>
        </AuthProvider>
      </BrowserRouter>
     
     
    
  )
}

export default App
