import { COOKIE_EXPIRY_DAYS, REST_API } from "../constants/constants";
import { Member } from "../types/types";

// ---------- Basic Cookie Functions ----------
export const setCookie = (
  name: string,
  value: string,
  days = COOKIE_EXPIRY_DAYS
) => {
  if (name === "user") cachedUser = undefined;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const match = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return match ? decodeURIComponent(match[2]) : null;
};

export const deleteCookie = (name: string) => {
  if (name === "user") cachedUser = undefined;
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

// ---------- Memoized User Access ----------
let cachedUser: Member | null | undefined = undefined;

export const getUserFromCookie = (): Member | null => {
  if (cachedUser !== undefined) return cachedUser;

  try {
    const data = getCookie("user");
    cachedUser = data ? (JSON.parse(data) as Member) : null;
  } catch {
    cachedUser = null;
  }

  return cachedUser;
};

export const refreshUserFromCookie = () => {
  try {
    const data = getCookie("user");
    cachedUser = data ? (JSON.parse(data) as Member) : null;
  } catch {
    cachedUser = null;
  }
};

// ---------- Other Utilities ----------
export const hasCookieConsent = () => {
  return localStorage.getItem("cookie_consent") === "true";
};

export const getAPIChoiceFromCookie = (): "REST" | "GraphQL" => {
  return getUserFromCookie()?.api_choice ?? REST_API;
};
