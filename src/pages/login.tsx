import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FormField, Button, Form } from "semantic-ui-react";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/members/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/movies/");
    } else {
      setFailedLogin(true);
    }
  };

  return (
    <div className="BluckBoster-header">
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
      {/* @TODO: better err message for failed to login */}
      {failedLogin ? <>failed to login</> : null}
      <Button onClick={() => navigate("/movies/")}>EXPLORE OUR MOVIES!</Button>
    </div>
  );
};
