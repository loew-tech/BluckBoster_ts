import { Button, Form, FormField } from "semantic-ui-react";

type LoginFormProps = {
  tryLogin: () => void;
  setUsername: (username: string) => void;
  username: string;
};
export const LoginForm = ({
  tryLogin,
  setUsername,
  username,
}: LoginFormProps) => {
  return (
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
  );
};
