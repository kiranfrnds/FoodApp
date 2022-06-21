import ReplayIcon from "@mui/icons-material/Replay";
import { log } from "console";
import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verification = () => {
  const { number } = useParams();

  const [password, setPassword] = useState<any>("");
  const [otp, setOtp] = useState<any>("");
  const [counter, setCounter] = useState<any>(59);

  const navigate = useNavigate();

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (event: any) => {
    setPassword(event);
    setOtp(event);
  };

  const onClickHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const Data: any = {
      username: number,
      password: password,
    };
    await fetch(
      "https://extended-retail-app.herokuapp.com/api/customer/login",
      {
        method: "POST",
        body: JSON.stringify(Data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((resp) => resp.json())
      .then((respo) => {
        if (respo.status === 200) {
          sessionStorage.setItem("logindata", JSON.stringify(respo));
          toast("Login Successful");
          navigate("/product");
        } else {
          toast("Please Enter valid OTP ");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div className="bg-container">
      <div className="bottom-bg">
        <img
          src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1652702958/logo_1_seaocx.png"
          alt="food-app"
          className="food-logo"
        />
        <h4 className="verify-head">Verification</h4>
        <p className="otp-desc">Enter the otp sent to +91 {number}</p>
        <div>
          <OtpInput
            inputStyle={{
              width: "60px",
              height: "50px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              margin: "0 5px",
              fontSize: "20px",
            }}
            value={otp}
            onChange={handleChange}
            numInputs={4}
          />
        </div>
        <p className="sec">sec {counter}</p>
        <div className="tog">
          <h4 className="resend">Resend OTP</h4>
          <ReplayIcon className="repay" />
        </div>
        <button
          className={password.length < 4 ? "verify" : "not"}
          onClick={onClickHandle}
          disabled={password.length < 4}
        >
          Verification
        </button>
      </div>
      <div>
        <img
          src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1652713695/Untitled-1_5_jthzoz.png"
          alt="otp"
          className="order-icon"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Verification;
