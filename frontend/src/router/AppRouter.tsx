import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Ajouter d'autres routes ici */}
    </Routes>
  );
};

export default AppRouter;
