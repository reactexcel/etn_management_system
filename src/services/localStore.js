import * as jwt from "jwt-simple";
export function localStore(key, value) {
  if (key === "clear") {
    localStorage.clear();
  } else {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      return localStorage.getItem(key);
    }
  }
}
export function setLoggedUser(token) {
  localStorage.setItem("token", token);
  return jwt.decode(token, "secret_key");
}

export function getLoggedUser() {
  const token = localStorage.getItem("token");
  try {
    const decodedToken = jwt.decode(token, "secret_key");
    return decodedToken;
  } catch (e) {
    return false;
  }
}
