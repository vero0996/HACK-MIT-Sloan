import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Home";
import AuthPage from "../pages/AuthPage";


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<Welcome />} />
      
    </Routes>
  );
};

export default AppRouter;
