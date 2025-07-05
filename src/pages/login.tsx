import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormField, Button, Form } from "semantic-ui-react";

import { ExplorePath, moviesPath, USER } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";
import { login } from "../utils/utils";

import "./login.css";
import { deleteCookie, hasCookieConsent } from "../utils/cookieUtils";
import { useUser } from "../context/UserContext";

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
      <Form onSubmit={tryLogin}>
        <FormField>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            placeholder="Enter username"
            autoFocus
          />
        </FormField>
        <Button type="submit" disabled={!username.trim()}>
          Login
        </Button>
      </Form>
      <Button onClick={() => navigate(moviesPath)}>VIEW OUR MOVIES!</Button>
      <Button onClick={() => navigate(ExplorePath)}>
        Explore Kevin Bacon!
      </Button>
      {failedLogin ? (
        <ErrorMessage msg={`failed to login with username ${failedUsername}`} />
      ) : null}
      {cookieErr ? (
        <ErrorMessage
          msg={`cannot login without accepting cookie use. Sorry we're monsters 😉`}
        />
      ) : null}
    </div>
  );
};
