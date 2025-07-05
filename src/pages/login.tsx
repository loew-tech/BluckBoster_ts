import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

import { ExplorePath, moviesPath, USER } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";
import { useUser } from "../context/UserContext";
import { LoginForm } from "../components/login/LoginForm";
import { login } from "../utils/utils";
import { deleteCookie, hasCookieConsent } from "../utils/cookieUtils";

import "./login.css";

export const LoginPage = () => {
  const { setUser } = useUser();

  const [username, setUsername] = useState<string>("");
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [cookieErr, setCookieErr] = useState<boolean>(false);
  const [failedUsername, setFailedUsername] = useState<string>("");

  const navigate = useNavigate();

  useEffect(
    () => {
      deleteCookie(USER);
      setUser(null);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const tryLogin = async () => {
    if (!hasCookieConsent()) {
      console.warn("Cannot login without accepting cookies");
      setCookieErr(true);
      setFailedLogin(false);
      return;
    }
    setCookieErr(false);
    const user = await login(username);
    if (user) {
      setUser(user);
      navigate(moviesPath);
    }
    setFailedUsername(username);
    setFailedLogin(true);
  };

  return (
    <div className="bluck-buster-login">
      <LoginForm
        tryLogin={tryLogin}
        setUsername={setUsername}
        username={username}
      />
      <Button onClick={() => navigate(moviesPath)}>VIEW OUR MOVIES!</Button>
      <Button onClick={() => navigate(ExplorePath)}>
        Explore Kevin Bacon!
      </Button>
      {failedLogin && (
        <ErrorMessage msg={`failed to login with username ${failedUsername}`} />
      )}
      {cookieErr && (
        <ErrorMessage
          msg={`cannot login without accepting cookie use. Sorry we're monsters 😉`}
        />
      )}
    </div>
  );
};
