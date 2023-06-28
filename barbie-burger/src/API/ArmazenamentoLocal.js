export const setToken = (token) => {
  if(token) {
    localStorage.setItem("token", token);
  }
}
export const setRole = (role) => localStorage.setItem("role", role);

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
}

export const getRole = () => localStorage.getItem("role");
export const removeToken = () => localStorage.removeItem("token");
export const removeRole = () => localStorage.removeItem("role");

export function setLocalStorageItem(key, value) {
  return localStorage.setItem(key, value);
}

export function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorageItem(key) {
  return localStorage.removeItem(key);
}
