import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";

test("full app rendering/navigating", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );
  const user = userEvent.click(screen.getByText("Welcome Back"));
  // verify page content for expected route
  // often you'd use a data-testid or role query, but this is also possible
  expect(screen.getByRole("button")).toBeInTheDocument();

  await user;

  // check that the content changed to the new page
  expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
});
