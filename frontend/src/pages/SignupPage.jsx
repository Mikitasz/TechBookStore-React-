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

    const { username, email, firstName, lastName, password, repeatPassword } =
      this.state;

    if (
      !username ||
      !email ||
      !firstName ||
      !lastName ||
      password !== repeatPassword
    ) {
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
        Registration successful! Redirecting to login page in 3 seconds... You
        can now log in.
      </p>
    ) : null;
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md relative">
        {isLoggedIn ? (
          <>
            <h1>Alreadu log in</h1>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 flex justify-center">
              Create account
            </h2>
            <form onSubmit={this.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
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
                <label htmlFor="firstName" className="block text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
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
                <label htmlFor="lastName" className="block text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
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
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                />
                {!emailValid && (
                  <p className="text-red-500">
                    Incorrect form of Email address.
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <div className="password-input-container flex justify-between">
                  <input
                    type={this.state.passwordRevealed ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    className="ml-2 px-2 py-1 bg-white text-white rounded "
                    onClick={this.togglePasswordReveal}
                    onMouseDown={this.togglePasswordReveal}
                    onMouseUp={this.togglePasswordReveal}
                    onMouseLeave={this.togglePasswordReveal}
                  >
                    {this.state.passwordRevealed ? (
                      <>
                        <img
                          src={see} // Replace with the actual path to your "Show" icon
                          alt="Show Password"
                          className="h-5 w-5 mr-1" // Adjust the height and width as needed
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={dontsee} // Replace with the actual path to your "Hide" icon
                          alt="Hide Password"
                          className="h-5 w-5 mr-1" // Adjust the height and width as needed
                        />
                      </>
                    )}
                  </button>
                </div>
                {passwordMessage}
              </div>
              <div className="mb-4">
                <label htmlFor="repeatPassword" className="block text-gray-700">
                  Repeat Password
                </label>
                <input
                  type="password"
                  name="repeatPassword"
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
                  className="bg-white text-black py-2 px-4 rounded-3xl hover:bg-green-100 focus:outline-none"
                >
                  Create Account
                </button>
              </div>
            </form>
            {registrationSuccessMessage}
          </>
        )}
      </div>
    );
  }
}

export default RegistrationForm;
