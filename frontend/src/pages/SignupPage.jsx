import React, { Component } from "react";

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
    };
  }
  togglePasswordReveal = () => {
    this.setState((prevState) => ({
      passwordRevealed: !prevState.passwordRevealed,
    }));
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    // Perform password validations
    if (name === "password") {
      // Ensure password contains only printable Unicode characters
      const isValidPassword = /^[\x20-\x7E]*$/.test(value);
      if (isValidPassword) {
        // Replace consecutive spaces with a single space and ensure no truncation
        const cleanedValue = value.replace(/\s+/g, " ").slice(0, 128);
        this.setState({ [name]: cleanedValue });
      }
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { password, repeatPassword } = this.state;

    if (password !== repeatPassword) {
      this.setState({ passwordMatchError: true });
    } else {
      this.setState({ passwordMatchError: false });
      // Continue with your registration logic here
      // Submit the form or perform any necessary actions
    }
  };

  render() {
    const { password, passwordMatchError } = this.state;

    const isPasswordValid =
      password.trim().length >= 12 && password.trim().length <= 128;

    const passwordStyle = {
      borderColor: isPasswordValid ? "initial" : "red",
    };

    // Conditionally render the password length message
    const passwordMessage =
      password.trim() === "" ? null : isPasswordValid ? (
        <p style={{ color: "green" }}>Password is valid.</p>
      ) : (
        <p style={{ color: "red" }}>
          Password must be at least 12 characters long.
        </p>
      );

    return (
      <div>
        <h2>Registration Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={this.state.passwordRevealed ? "text" : "password"}
                name="password"
                value={password}
                onChange={this.handleInputChange}
                style={passwordStyle}
              />
              <button
                type="button"
                className="reveal-password-button"
                onClick={this.togglePasswordReveal}
              >
                {this.state.passwordRevealed ? "Hide" : "Show"}
              </button>
            </div>
            {passwordMessage}
          </div>
          <div>
            <label htmlFor="repeatPassword">Repeat Password</label>
            <input
              type="password"
              name="repeatPassword"
              value={this.state.repeatPassword}
              onChange={this.handleInputChange}
              style={{ borderColor: passwordMatchError ? "red" : "initial" }}
            />
            {passwordMatchError && (
              <p style={{ color: "red" }}>Passwords do not match.</p>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
