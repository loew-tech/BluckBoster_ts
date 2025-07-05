import { COOKIE_CONSENT, USER, REST_API } from "../constants/constants";
import { Member } from "../types/types";

export const setCookie = (name: string, value: string, days = 7) => {
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
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

export const getUserFromCookie = (): Member | null => {
  try {
    const data = getCookie(USER);
    return data ? (JSON.parse(data) as Member) : null;
  } catch {
    return null;
  }
};

export const hasCookieConsent = () => {
  return localStorage.getItem(COOKIE_CONSENT) === "true";
};

export const getAPIChoiceFromCookie = (): "REST" | "GraphQL" => {
  return getUserFromCookie()?.api_choice ?? REST_API;
};
