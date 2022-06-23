import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import { BrowserRouter as Router } from "react-router-dom";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

async function GetOtp(number: any) {
  try {
    const result = await fetch(
      `https://extended-retail-app.herokuapp.com/api/customer/getOtp`,
      {
        method: "POST",
        body: JSON.stringify({ username: number }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await result.json();
    return data.status === 200;
  } catch (err) {
    return null;
  }
}

beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementationOnce(() => {});
  jest.spyOn(console, "error").mockImplementationOnce(() => {});
});

test("snapshot", () => {
  const { asFragment } = render(
    <Router>
      <LoginPage />
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders login page", () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );
  expect(screen.getByText("Login Account")).toBeInTheDocument();
});

test("renders input field", () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );
  expect(screen.getByPlaceholderText("Mobile No")).toBeInTheDocument();
});

test("after entering mobile number, renders getotp button", () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );
  const input = screen.getByPlaceholderText("Mobile No");
  const button = screen.getByRole("button");
  fireEvent.change(input, { target: { value: "1234567891" } });
  expect(button).toBeEnabled();
});

test("after clicking button goes to verification page", async () => {
  render(
    <Router>
      <LoginPage />
    </Router>
  );
  const input = screen.getByPlaceholderText("Mobile No");
  const button = screen.getByRole("button");
  fireEvent.change(input, { target: { value: "1234567891" } });
  fireEvent.click(button);
  const result = await GetOtp("1234567891");
  expect(result).toBeTruthy();
});
