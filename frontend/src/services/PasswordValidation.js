const isPasswordValid = (password) => {
    const trimmedPassword = password.trim();
    return trimmedPassword.length >= 12 && trimmedPassword.length <= 128;
  };
  
  export { isPasswordValid };