export function handleLogout() {
  // Clear the authentication token from local storage
  localStorage.removeItem("token");
  window.location.href = '/';
}
