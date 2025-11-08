import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Home";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      {/* Ajouter d'autres routes ici */}
    </Routes>
  );
};

export default AppRouter;
