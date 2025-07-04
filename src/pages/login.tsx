import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormField, Button, Form } from "semantic-ui-react";

import { ExplorePath, moviesPath } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";
import { login } from "../utils/utils";

import "./login.css";
import {
  deleteCookie,
  hasCookieConsent,
  setCookie,
} from "../utils/cookieUtils";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [cookieErr, setCookieErr] = useState<boolean>(false);
  const [failedUsername, setFailedUsername] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    deleteCookie("user");
  }, []);

  const tryLogin = async () => {
    if (!hasCookieConsent()) {
      console.warn("Cannot login without accepting cookies");
      setCookieErr(true);
      return;
    }
    const user = await login(username);
    if (user) {
      setCookie("user", JSON.stringify(user));
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
        <Button type="submit">Login</Button>
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
