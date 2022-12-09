import { Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ip } from "../config";
import { Theme } from "../Context/Provider";
import { currentDate } from "../lib/PureFunctions";

import "./LoginSingup.css";

const submit = async (text, updateOpenSnackbar, updatemsg) => {
  let bool;

  try {
    let temp = {};
    temp.firstname = text.firstname;
    temp.lastname = text.lastname;
    temp.email = text.email;
    temp.phone = text.phone;
    temp.password = text.password;
    temp.createdon = {
      date: currentDate()["date"],
      month: currentDate()["month"],
      year: currentDate()["year"],
    };

    // console.log("@@@ ",temp.createdon);

    const data = await fetch(`${ip}/api/v1/users/register`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log("fetch error" + err);
      });

    if (!data.result) {
      updateOpenSnackbar(true);
      updatemsg(data.message);
    }

    if (data.result) {
      // return true;
      bool = true;
    } else {
      bool = false;
    }
  } catch (e) {
    bool = false;
  }

  return bool;
};

const login = async (text, updateOpenSnackbar, updatemsg, updateLogin) => {
  let bool;
  try {
    const data = await fetch(`${ip}/api/v1/users/login`, {
      method: "POST",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log("fetch error" + err);
      });

    if (!data.result) {
      updateOpenSnackbar(true);
      updatemsg(data.message);
    }

    if (data.result) {
      bool = true;
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("phone", text.phone);

      updateLogin(true);
    } else {
      bool = false;
    }
  } catch (e) {
    console.log(">>>>>> e", e);

    bool = false;
  }
};

const LoginSignup = () => {
  let { updateLogin } = useContext(Theme);
  let [str, signinFunction] = useState("login");

  let [openSnackbar, updateOpenSnackbar] = useState(false);
  let [msg, updatemsg] = useState("");
  let [err, updateErr] = useState(false);

  let [signinText, updateSigninText] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  let [helperSigninText, updateHelperSigninText] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  let [loginText, updateLoginText] = useState({
    phone: "",
    password: "",
  });

  let [helperLoginText, updateHelperLoginText] = useState({
    phone: "",
    password: "",
  });

  useEffect(() => {
    let temp = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (signinText.firstname === null || signinText.firstname === "") {
      err = true;
      temp.firstname = "Name can't be blank";
    } else if (signinText.firstname.indexOf(" ") >= 0) {
      err = true;
      temp.firstname = "Enter your firstname only";
    } else {
      err = false;
      temp.firstname = "";
    }

    let x = signinText.email;
    let atposition = x.indexOf("@");
    let dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
      err = true;
      temp.email = "Email is invalid";
    } else {
      err = false;
      temp.email = "";
    }

    if (signinText.phone === "" || signinText.phone === null) {
      err = true;
      temp.phone = "Phone number can't be blank";
    } else if (signinText.phone.length < 10) {
      err = true;
      temp.phone = "Phone Number too  short";
    } else if (signinText.phone[0] < 3) {
      err = true;
      temp.phone = "Phone number not valid";
    } else {
      err = false;
      temp.phone = "";
    }

    if (signinText.password === "" || signinText.password === null) {
      err = true;
      temp.password = "Password can't be blank";
    } else {
      err = false;
      temp.password = "";
    }
    // else if()

    if (signinText.password !== signinText.confirmPassword) {
      err = true;
      temp.confirmPassword = "Passwords doesn't match";
    } else {
      err = false;
      temp.confirmPassword = "";
    }

    updateErr(err);
    updateHelperSigninText(temp);
  }, [signinText]);

  useEffect(() => {
    let temp = {
      phone: "",
      password: "",
    };

    if (loginText.phone === "" || loginText.phone === null) {
      // err = true;
      temp.phone = "Phone number can't be blank";
    } else if (loginText.phone.length < 10) {
      // err = true;
      temp.phone = "Phone Number too  short";
    } else if (loginText.phone[0] < 3) {
      // err = true;
      temp.phone = "Phone number not valid";
    } else {
      // err = false;
      temp.phone = "";
    }

    if (loginText.password === "" || loginText.password === null) {
      // err = true;
      temp.password = "Password can't be blank";
    } else {
      // err = false;
      temp.password = "";
    }
    updateErr(err);

    updateHelperLoginText(temp);
  }, [loginText]);

  let loginButton = () => {
    let login = document.getElementById("login");
    let signup = document.getElementById("signup");
    login.classList.add("active");

    if (signup.classList.contains("active")) signup.classList.remove("active");

    signinFunction("login");
  };

  let signupButton = () => {
    let login = document.getElementById("login");
    let signup = document.getElementById("signup");
    signup.classList.add("active");

    if (login.classList.contains("active")) login.classList.remove("active");

    signinFunction("signup");
  };

  const loginSubmitFunction = async (e) => {
    e.preventDefault();

    const bool = await login(loginText, updateOpenSnackbar, updatemsg, updateLogin);

    const temp = {
      phone: "",
      password: "",
    };
    if (bool) {
      updateLogin(true);
      // updateHelperLoginText(temp);
      updateHelperLoginText(temp);
    }
  };

  const singupSubmitFunction = async (e) => {
    e.preventDefault();
    if (!err) {
      const bool = await submit(signinText, updateOpenSnackbar, updatemsg);

      if (bool) {
        let temp = {
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        };

        loginButton();
        updateSigninText(temp);
      } else {
        updateHelperSigninText({
          firstname: "",
          lastname: "",
          email: "Email already in database, login",
          phone: "Phone already in database, try to login",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };

  function intoThemain() {
    if (str === "login") {
      return (
        <div>
          <form onSubmit={loginSubmitFunction}>
            <div className="formText">Phone</div>
            <input
              className="input-login"
              type="number"
              placeholder="Enter your Phone Number"
              onChange={(e) => {
                updateLoginText({ ...loginText, phone: e.target.value });
              }}
              value={loginText.phone}
              autocomplete="off"
              required
            />
            <div className="helperText">{helperLoginText.phone}</div>
            <div className="formText">Password</div>
            <input
              className="input-login"
              type="password"
              name="password"
              autocomplete="off"
              onChange={(e) => {
                updateLoginText({ ...loginText, password: e.target.value });
              }}
              value={loginText.password}
              required
            />
            <div className="helperText">{helperLoginText.password}</div>
            <br />
            <input type="submit" className="formButton" value="Login" />
            <br />
            <div onClick={signupButton} className="signupText">
              Don't have account Create one ?
            </div>
          </form>
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={singupSubmitFunction}>
          <div style={{ display: "flex" }}>
            <div>
              <div className="formText">First Name</div>
              <input
                className="input-login"
                autocomplete="off"
                type="text"
                style={{ width: 130 }}
                name="name"
                placeholder="Enter your first name"
                onChange={(e) => {
                  updateSigninText({
                    ...signinText,
                    firstname: e.target.value,
                  });
                }}
                value={signinText.firstname}
                required
              />
              <div className="helperText">{helperSigninText.firstname}</div>
            </div>
            <div>
              <div className="formText">Last Name</div>
              <input
                className="input-login"
                autocomplete="off"
                type="text"
                name="name"
                style={{ width: 130 }}
                placeholder="Enter your last name"
                onChange={(e) => {
                  updateSigninText({ ...signinText, lastname: e.target.value });
                }}
                value={signinText.lastname}
                // required
              />
              <div className="helperText">{helperSigninText.lastname}</div>
            </div>
          </div>
          <div className="formText">Email Id</div>
          <input
            className="input-login"
            autocomplete="off"
            type="email"
            name="signupEmailId"
            placeholder="Enter your Email Id"
            onChange={(e) => {
              updateSigninText({ ...signinText, email: e.target.value });
            }}
            value={signinText.email}
            required
          />
          <div className="helperText">{helperSigninText.email}</div>
          <div className="formText">Phone</div>
          <input
            className="input-login"
            autocomplete="off"
            type="number"
            name="signupEmailId"
            placeholder="Enter your Phone Number"
            onChange={(e) => {
              updateSigninText({ ...signinText, phone: e.target.value });
            }}
            value={signinText.phone}
            required
          />
          <div className="helperText">{helperSigninText.phone}</div>
          <div style={{ display: "flex" }}>
            <div>
              <div className="formText">Password</div>
              <input
                className="input-login"
                autocomplete="off"
                type="password"
                style={{ width: 130 }}
                name="signuppassword"
                onChange={(e) => {
                  updateSigninText({ ...signinText, password: e.target.value });
                }}
                value={signinText.password}
                required
              />
              <div className="helperText">{helperSigninText.password}</div>
            </div>
            <div>
              <div className="formText">Confirm Password</div>
              <input
                className="input-login"
                autocomplete="off"
                type="password"
                style={{ width: 130 }}
                name="signupConfirmPassword"
                onChange={(e) => {
                  updateSigninText({
                    ...signinText,
                    confirmPassword: e.target.value,
                  });
                }}
                value={signinText.confirmPassword}
                required
              />
              <div className="helperText">{helperSigninText.confirmPassword}</div>
            </div>
          </div>
          <br />
          <input type="submit" value="Create Your Account" className="formButton" />

          <div onClick={loginButton} className="loginText">
            Login ?
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      {/* <div className="message">{txt}</div> */}
      <div className="main">
        <div className="mainButton">
          <div className="loginButton active" id="login" onClick={loginButton}>
            Login
          </div>
          <div className="loginButton" id="signup" onClick={signupButton}>
            Sign Up
          </div>
        </div>
        <div className="mainPart">{intoThemain()}</div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={updateOpenSnackbar}
          message={msg}
          severity="warning"
          // action={action}
        />
      </div>
    </>
  );
};

export default LoginSignup;
