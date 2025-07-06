import { render, screen, fireEvent } from "@testing-library/react";

import { LoginForm } from "../LoginForm";

describe("LoginForm", () => {
  const tryLogin = jest.fn();
  const setUsername = jest.fn();

  beforeEach(() => {
    tryLogin.mockClear();
    setUsername.mockClear();
  });

  it("renders input with given username", () => {
    render(
      <LoginForm
        username="alice"
        setUsername={setUsername}
        tryLogin={tryLogin}
      />
    );
    expect(screen.getByDisplayValue("alice")).toBeInTheDocument();
  });

  it("calls setUsername on input change", () => {
    render(
      <LoginForm username="" setUsername={setUsername} tryLogin={tryLogin} />
    );

    fireEvent.change(screen.getByPlaceholderText(/enter username/i), {
      target: { value: "bob" },
    });

    expect(setUsername).toHaveBeenCalledWith("bob");
  });

  it("calls tryLogin on submit", () => {
    render(
      <LoginForm
        username="charlie"
        setUsername={setUsername}
        tryLogin={tryLogin}
      />
    );

    fireEvent.submit(screen.getByText(/username/i));
    expect(tryLogin).toHaveBeenCalled();
  });

  it("disables login button when username is blank", () => {
    render(
      <LoginForm username="   " setUsername={setUsername} tryLogin={tryLogin} />
    );
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });
});
