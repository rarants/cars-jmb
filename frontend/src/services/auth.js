export const TOKEN_KEY = "@user-token";
export const USER_ID = "@user-id";
export const ROLES = "@user-roles";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null;
export const getRole = role => {
  if (!isAuthenticated()) return false;
  const roles = localStorage.getItem(ROLES);
  return roles ? JSON.parse(roles).includes(role) : false;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USER_ID);
export const getRoles = () => localStorage.getItem(ROLES);

export const login = (token, roles) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (Array.isArray(roles) && roles.length)
    localStorage.setItem(ROLES, JSON.stringify(roles));
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(ROLES);
};
