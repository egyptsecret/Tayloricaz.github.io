import { Route, Routes } from "react-router-dom";
import { SongQuiz } from "../../views/SongQuiz";
import { HomePage } from "../../views/Hompage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/songquiz/:id" element={<SongQuiz />} />
    </Routes>
  );
};
