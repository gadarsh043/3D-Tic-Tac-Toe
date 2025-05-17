// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TwoPlayer from '../pages/TwoPlayer';
import PlayWithAI from '../pages/PlayWithAI';
import Rules from '../pages/Rules';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/two-player" element={<TwoPlayer />} />
      <Route path="/play-ai" element={<PlayWithAI />} />
      <Route path="/rules" element={<Rules />} />
    </Routes>
  );
};

export default AppRoutes;
