import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { StateProvider } from "./utils/StateContext"
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisteredServicesPage from "./pages/RegisteredServicesPage"

function App() {

  return (
    <>
    <StateProvider>
    <Routes>
    <Route index element={<HomePage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/register" element={<RegisterPage />}></Route>
    <Route path="/services" element={<RegisteredServicesPage />}></Route>
    </Routes>
    </StateProvider>
    </>
  )
}

export default App
