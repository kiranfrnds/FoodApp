import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [number, setNumber] = useState<any>("");

  const navigate = useNavigate();

  const onClickHandle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    let userData = await fetch(
      "https://extended-retail-app.herokuapp.com/api/customer/getOtp",
      {
        method: "POST",
        body: JSON.stringify({ username: number }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    userData = await userData.json();
    if (userData.status === 200) {
      localStorage.setItem("mobileNumber", number);
      toast("OTP sent to your mobile number");
      navigate({
        pathname: `/verification/${number}`,
      });
    } else {
      toast("Please Enter valid Number ❌");
    }
  };

  return (
    <div className="bg-container">
      <div className="bottom-bg">
        <img
          src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1652702958/logo_1_seaocx.png"
          alt="food-app"
          className="food-logo"
        />
        <h4 className="main-heading">Welcome Back</h4>
        <h5 className="login-desc">Login Account</h5>
        <div className="login-items">
          <div className="login">
            <img
              src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1652702965/1200px-Flag_of_India_1_dfhmj5.png"
              alt="india"
              className="india-log"
            />
            <p className="num-logo">+91 </p>
            <img
              src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1652708990/Vector_5_vvb70x.png"
              alt="fold"
              className="fold"
            />
            <hr className="line" />
          </div>

          <div className="items">
            <input
              type="number"
              placeholder="Mobile No"
              className="input"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            <PhoneIcon className="phone-icon" />
          </div>
        </div>
        <button
          onClick={onClickHandle}
          disabled={number.length < 10}
          className={number.length < 10 ? "disable" : "enable"}
        >
          GET OTP
        </button>
      </div>
      <div className="bg-image">
        <img
          src="https://res.cloudinary.com/dq21uo3uq/image/upload/v1652709778/Online_Shoping_29-ai_1_ijnxly.png"
          alt="order"
          className="order-icon"
        />
      </div>
      <ToastContainer />
      <div></div>
    </div>
  );
}

export default LoginPage;
