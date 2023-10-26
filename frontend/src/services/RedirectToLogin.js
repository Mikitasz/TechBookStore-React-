const redirectToLogin = () => {
  setTimeout(() => {
    // Replace '/login' with the actual URL of your login page
    window.location.href = "/login";
  }, 3000); // 3000 milliseconds = 3 seconds
};

export { redirectToLogin };
