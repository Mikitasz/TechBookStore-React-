import React, { Component } from "react";
import see from "../assets/see.svg";
import dontsee from "../assets/dontsee.svg";
import SignUp from "../services/API/SignUpAPI";
import { isUserLoggedIn } from "../services/IsAuth";
import { redirectToLogin } from "../services/RedirectToLogin";
import { isPasswordValid } from "../services/PasswordValidation";

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: "",
      passwordMatchError: false,
      passwordRevealed: false,
      registrationSuccess: false,
      usernameValid: true,
      firstNameValid: true,
      lastNameValid: true,
      emailValid: true,
    };
  }

  togglePasswordReveal = (event) => {
    if (event.type === "mousedown") {
      this.setState({ passwordRevealed: true });
    } else if (event.type === "mouseup" || event.type === "mouseleave") {
      this.setState({ passwordRevealed: false });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      const isValidPassword = /^[\x20-\x7E]*$/.test(value);
      if (isValidPassword) {
        const cleanedValue = value.replace(/\s+/g, " ").slice(0, 128);
        this.setState({ [name]: cleanedValue });
      }
    } else if (name === "username") {
      // Check if the username consists of a single word
      const isValidUsername = /^[A-Za-z0-9_]+$/.test(value);
      this.setState({ [name]: value, usernameValid: isValidUsername });
    } else if (name === "email") {
      // Check if the username consists of a single word
      const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        value
      );
      this.setState({ [name]: value, emailValid: isValidEmail });
    } else if (name === "firstName" || name === "lastName") {
      // Check if first name and last name are not empty and don't contain spaces
      const isValidName = /^[A-Za-z]+$/.test(value);
      this.setState({ [name]: value, [`${name}Valid`]: isValidName });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username,
      email,
      firstName,
      lastName,
      password,
      repeatPassword,
    } = this.state;

    if (!username || !email || !firstName || !lastName || password !== repeatPassword) {
      this.setState({ passwordMatchError: true });
    } else {
      this.setState({ passwordMatchError: false });

      try {
        const userData = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          first_name: this.state.firstName,
          last_name: this.state.lastName,
        };

        await SignUp(userData);

        this.setState({ registrationSuccess: true });
        redirectToLogin();
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }
  };

  render() {
    const isLoggedIn = isUserLoggedIn();
    const {
      password,
      passwordMatchError,
      usernameValid,
      firstNameValid,
      lastNameValid,
      emailValid,
    } = this.state;

    const isValidPassword = isPasswordValid(password);

    const passwordMessage =
      password.trim() === "" ? null : isValidPassword ? (
        <p style={{ color: "green" }}>Password is valid.</p>
      ) : (
        <p style={{ color: "red" }}>
          Password must be at least 12 characters long.
        </p>
      );

    const registrationSuccessMessage = this.state.registrationSuccess ? (
      <p style={{ color: "green" }}>
        Registration successful! Redirecting to the login page in 3 seconds...
        You can now log in.
      </p>
    ) : null;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-96 mt-[-50px]">
          {isLoggedIn ? (
            <div>
              <h1>Already logged in</h1>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4 flex justify-center ">
                Create Account
              </h2>
              <form onSubmit={this.handleSubmit}>
                <div className="mb-4">
                
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                  {!usernameValid && (
                    <p className="text-red-500">
                      Username should consist of a single word (no spaces or
                      special characters).
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                  {!firstNameValid && (
                    <p className="text-red-500">
                      First Name should not be empty and should only contain
                      letters.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={this.handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                  {!lastNameValid && (
                    <p className="text-red-500">
                      Last Name should not be empty and should only contain
                      letters.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                 
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                  {!emailValid && (
                    <p className="text-red-500">
                      Incorrect format of the Email address.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  
                  <div className="password-input-container flex justify-between">
                    <input
                      type={this.state.passwordRevealed ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleInputChange}
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      className="ml-2 px-2 py-1 bg-white text-white rounded"
                      onClick={this.togglePasswordReveal}
                      onMouseDown={this.togglePasswordReveal}
                      onMouseUp={this.togglePasswordReveal}
                      onMouseLeave={this.togglePasswordReveal}
                    >
                      {this.state.passwordRevealed ? (
                        <img
                          src={see}
                          alt="Show Password"
                          className="h-5 w-5 mr-1"
                        />
                      ) : (
                        <img
                          src={dontsee}
                          alt="Hide Password"
                          className="h-5 w-5 mr-1"
                        />
                      )}
                    </button>
                  </div>
                  {passwordMessage}
                </div>
                <div className="mb-4">
                  
                  <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    value={this.state.repeatPassword}
                    onChange={this.handleInputChange}
                    className={`border ${
                      passwordMatchError ? "border-red-500" : "border-gray-300"
                    } rounded px-3 py-2 w-full focus:outline-none`}
                  />
                  {passwordMatchError && (
                    <p className="text-red-500">Passwords do not match.</p>
                  )}
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-3 rounded w-full hover:bg-blue-700"
                  >
                    Create Account
                  </button>
                </div>
              </form>
              {registrationSuccessMessage}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default RegistrationForm;
