import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormField, Button, Form } from "semantic-ui-react";

import { memberLoginURI, moviesPath } from "../constants/constants";
import { ErrorMessage } from "../components/errorMessage";

export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const [failedUsername, setFailedUsername] = useState<string>("");

  const navigate = useNavigate();
  localStorage.removeItem("user");

  const login = async () => {
    const response = await fetch(memberLoginURI, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate(moviesPath);
    } else {
      setFailedLogin(true);
      setFailedUsername(username);
    }
  };

  return (
    <div className="bluck-buster-login">
      <Form>
        <FormField>
          <label>username </label>
          <input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
      </Form>
      <Button type="submit" onClick={login}>
        Login
      </Button>
      <Button onClick={() => navigate(moviesPath)}>EXPLORE OUR MOVIES!</Button>
      {failedLogin ? (
        <ErrorMessage msg={`failed to login with username ${failedUsername}`} />
      ) : null}
    </div>
  );
};
