import * as cookieUtils from "../../utils/cookieUtils";

describe("cookieUtils", () => {
  beforeEach(() => {
    document.cookie = "";
    localStorage.clear();
    (cookieUtils as any).cachedUser = undefined;
  });
  it("sets and gets a cookie", () => {
    cookieUtils.setCookie("test", "value", 1);
    expect(cookieUtils.getCookie("test")).toBe("value");
  });
  it("deletes a cookie", () => {
    cookieUtils.setCookie("test", "value");
    cookieUtils.deleteCookie("test");
    expect(cookieUtils.getCookie("test")).toBeNull();
  });
  it("memoizes and returns user", () => {
    const user = { username: "test_user" };
    cookieUtils.setCookie("user", JSON.stringify(user));
    expect(cookieUtils.getUserFromCookie()).toEqual(user);
  });
  it("refreshes cached user", () => {
    const user = { username: "another_user" };
    cookieUtils.setCookie("user", JSON.stringify(user));
    cookieUtils.refreshUserFromCookie();
    expect(cookieUtils.getUserFromCookie()).toEqual(user);
  });
  it("returns REST_API if no user", () => {
    cookieUtils.deleteCookie("user");
    expect(cookieUtils.getAPIChoiceFromCookie()).toBe("REST");
  });
  it("checks cookie consent", () => {
    expect(cookieUtils.hasCookieConsent()).toBe(false);
    localStorage.setItem("cookie_consent", "true");
    expect(cookieUtils.hasCookieConsent()).toBe(true);
  });
});
