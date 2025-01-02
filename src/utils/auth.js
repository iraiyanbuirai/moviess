import Cookies from "js-cookie";

export const setSessionCookie = (user) => {
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
};

export const getSessionCookie = () => {
  const user = Cookies.get("user");
  return user ? JSON.parse(user) : null;
};

export const removeSessionCookie = () => {
  Cookies.remove("user");
};
