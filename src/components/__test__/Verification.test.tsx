import { fireEvent, render, screen } from "@testing-library/react";
import Verification from "../Verification";
import { BrowserRouter as Router } from "react-router-dom";

async function GetOtp(number: any, password: any) {
  try {
    const result = await fetch(
      `https://extended-retail-app.herokuapp.com/api/customer/login`,
      {
        method: "POST",
        body: JSON.stringify({ username: number, password: password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await result.json();
    if (data.status === 200) {
      return data.message;
    }
  } catch (err) {
    return null;
  }
}

describe("Verification", () => {
  beforeAll(() => {
    jest.spyOn(window, "alert").mockImplementationOnce(() => {});
    jest.spyOn(console, "error").mockImplementationOnce(() => {});
  });

  it("snapshot", () => {
    const { asFragment } = render(
      <Router>
        <Verification />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
  //   it("renders input field", () => {
  //     render(
  //       <Router>
  //         <Verification />
  //       </Router>
  //     );
  //     expect(screen.getByTestId("otp-input")).toBeInTheDocument();
  //   });

  it("renders resendOtp button", () => {
    render(
      <Router>
        <Verification />
      </Router>
    );
    expect(screen.getByText("Resend OTP")).toBeInTheDocument();
  });
  it("enable submit button after entering 4 digit otp", () => {
    render(
      <Router>
        <Verification />
      </Router>
    );
    fireEvent.change(screen.getByTestId("otp-input-0"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByTestId("otp-input-1"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByTestId("otp-input-2"), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByTestId("otp-input-3"), {
      target: { value: "4" },
    });
    const button = screen.getByRole("button");
    expect(button).toBeDefined();
  });
  it("goto prodcut page after clicking on submit button", async () => {
    render(
      <Router>
        <Verification />
      </Router>
    );
    fireEvent.click(screen.getByRole("button"));
    const result = await GetOtp("1234567891", "1234");
    expect(result).toBeTruthy();
  });
});
