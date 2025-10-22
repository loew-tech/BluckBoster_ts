import { Route, Routes, BrowserRouter } from "react-router-dom";

import { LoginPage } from "./login";
import { MoviesPage } from "./movies";
import { CheckoutPage } from "./checkout";
import { MemberPage } from "./member";
import { MoviePage } from "./movie";
import {
  checkoutPath,
  ExplorePath,
  loginPath,
  memberPath,
  moviesPath,
  RecEnginePath,
} from "../constants/constants";
import { Explore } from "./explore";
import { UserProvider } from "../context/UserContext";
import { RecEnginePage } from "./recEngine";

export const Main = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path={loginPath} element={<LoginPage />} />
          <Route path={moviesPath} element={<MoviesPage />} />
          <Route path={`${moviesPath}/:movieID`} element={<MoviePage />} />
          <Route path={checkoutPath} element={<CheckoutPage />} />
          <Route path={memberPath} element={<MemberPage />} />
          <Route path={ExplorePath} element={<Explore />} />
          <Route path={RecEnginePath} element={<RecEnginePage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};
