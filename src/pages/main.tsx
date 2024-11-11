import { Route, Routes, BrowserRouter } from "react-router-dom";

import { LoginPage } from "./login";
import { MoviesPage } from "./movies";
import { CheckoutPage } from "./checkout";
import { MemberPage } from "./member";
import { MoviePage } from "./movie";
import {
  checkoutPath,
  loginPath,
  memberPath,
  moviesPath,
} from "../constants/constants";

export const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path={loginPath} element={<LoginPage />} />
        <Route path={moviesPath} element={<MoviesPage />} />
        <Route path={`${moviesPath}/:movieID`} element={<MoviePage />} />
        <Route path={checkoutPath} element={<CheckoutPage />} />
        <Route path={memberPath} element={<MemberPage />} />
      </Routes>
    </BrowserRouter>
  );
};
