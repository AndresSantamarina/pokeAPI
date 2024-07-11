import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Buscador from "../pages/Buscador";
import Menu from "../common/Menu";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/search" element={<Buscador />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
