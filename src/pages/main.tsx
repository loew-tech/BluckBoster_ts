import { Route, Routes, BrowserRouter } from "react-router-dom";

import { LoginPage } from "./login";
import { MoviesPage } from "./movies";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/movies/" element={<MoviesPage />} />
      </Routes>
    </BrowserRouter>
  );
};
