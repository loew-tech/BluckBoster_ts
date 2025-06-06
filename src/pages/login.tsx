import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormField, Button, Form } from "semantic-ui-react";

import { moviesPath } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";
import { login } from "../utils/utils";

import "./login.css";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [failedUsername, setFailedUsername] = useState<string>("");

  const navigate = useNavigate();
  localStorage.removeItem("user");

  const tryLogin = async () => {
    const success = await login(username);
    if (success) {
      navigate(moviesPath);
    }
    setFailedUsername(username);
    setFailedLogin(true);
  };

  return (
    <div className="bluck-buster-login">
      <Form>
        <FormField>
          <label>username </label>
          <input
            className="login-input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
      </Form>
      <Button type="submit" onClick={tryLogin}>
        Login
      </Button>
      <Button onClick={() => navigate(moviesPath)}>EXPLORE OUR MOVIES!</Button>
      {failedLogin ? (
        <ErrorMessage msg={`failed to login with username ${failedUsername}`} />
      ) : null}
    </div>
  );
};
