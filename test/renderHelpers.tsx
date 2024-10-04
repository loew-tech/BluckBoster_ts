import { render } from "@testing-library/react";
import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const renderWithNav = (component: ReactElement) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={component} />
      </Routes>
    </BrowserRouter>
  );
};
