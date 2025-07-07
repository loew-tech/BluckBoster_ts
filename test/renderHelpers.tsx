import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../src/context/UserContext";

/**
 * Renders a component with <UserProvider> and <MemoryRouter>
 * Use this for components that need router context (like useParams, Link, etc.)
 */
export const renderWithRouter = (
  ui: ReactElement,
  { route = "/", path = "/" } = {},
  options?: Omit<RenderOptions, "wrapper">
) => {
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <UserProvider>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </UserProvider>
    </MemoryRouter>,
    options
  );
};

/**
 * Use this if your component already includes a router inside.
 */
export const renderWithNav = (component: ReactElement) => {
  return render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={component} />
      </Routes>
    </MemoryRouter>
  );
};

/**
 * Basic provider-only rendering (no router).
 * Use this for components that don't need routing.
 */
const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>{children}</UserProvider>
);

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, { wrapper: AllProviders, ...options });
};
