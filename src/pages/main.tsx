import { Route, Routes, BrowserRouter } from "react-router-dom";

import { LoginPage } from "./login";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
