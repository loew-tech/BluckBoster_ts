import {
  login,
  checkout,
  fetchMovies,
  fetchCart,
  fetchMovie,
  returnRentals,
  updateCart,
  setAPIChoice,
  getUser,
} from "../../utils/rest_utils";
import { GRAPHQL_API } from "../../constants/constants";
import * as cookieUtils from "../../utils/cookieUtils";
import { testMember } from "../../../test/test-data";

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

describe("rest_utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("returns user on success", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ username: "test_user" }),
      });
      const result = await login("test_user");
      expect(result).toEqual({ username: "test_user" });
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
        expect.objectContaining({ method: "POST" })
      );
    });
    it("returns null on failure", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await login("bad_user");
      expect(result).toBeNull();
    });
  });

  describe("checkout", () => {
    it("returns true on success", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const result = await checkout("test_user", ["id1", "id2"]);
      expect(result).toBe(true);
    });
    it("returns false on failure", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await checkout("test_user", ["bad_id"]);
      expect(result).toBe(false);
    });
  });

  describe("fetchMovies", () => {
    it("returns movie array", async () => {
      const fakeMovies = [{ id: "m1", title: "Movie 1" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => fakeMovies,
      });
      const result = await fetchMovies("A");
      expect(result).toEqual(fakeMovies);
    });
    it("returns [] on failure", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await fetchMovies("A");
      expect(result).toHaveLength(0);
    });
  });

  describe("fetchCart", () => {
    it("returns cart movies", async () => {
      const fakeCart = [{ id: "m1", title: "Rented" }];
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => fakeCart });
      const result = await fetchCart("test_user");
      expect(result).toEqual(fakeCart);
    });
    it("returns empty array on failure", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await fetchCart("test_user");
      expect(result).toEqual([]);
    });
  });

  describe("fetchMovie", () => {
    it("returns movie data", async () => {
      const movie = { id: "123", title: "Some Movie" };
      mockFetch.mockResolvedValueOnce({ ok: true, json: async () => movie });
      const result = await fetchMovie("123");
      expect(result).toEqual(movie);
    });
    it("returns null on failure", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await fetchMovie("bad_id");
      expect(result).toBeNull();
    });
  });

  describe("returnRentals", () => {
    it("returns true on success", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const result = await returnRentals("test_user", ["id1"]);
      expect(result).toBe(true);
    });
    it("returns false on failure", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await returnRentals("test_user", ["bad_id"]);
      expect(result).toBe(false);
    });
  });

  describe("updateCart", () => {
    it("adds movie to cart", () => {
      const result = updateCart("user", "id1", ["id2"], false);
      expect(result).toEqual(["id1", "id2"]);
    });
    it("removes movie from cart", () => {
      const result = updateCart("user", "id1", ["id1", "id2"], true);
      expect(result).toEqual(["id2"]);
    });
    it("calls fetch for add", () => {
      const fetchSpy = jest
        .spyOn(global, "fetch")
        .mockImplementation(jest.fn());
      updateCart("user", "id1", ["id2"], false);
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/cart"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ username: "user", movie_id: "id1" }),
        })
      );
    });
    it("calls fetch for remove", () => {
      const fetchSpy = jest
        .spyOn(global, "fetch")
        .mockImplementation(jest.fn());
      updateCart("user", "id1", ["id1", "id2"], true);
      expect(fetchSpy).toHaveBeenCalledWith(
        expect.stringContaining("/cart/remove"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ username: "user", movie_id: "id1" }),
        })
      );
    });
  });

  describe("setAPIChoice", () => {
    it("returns true on success", async () => {
      jest.spyOn(cookieUtils, "getUserFromCookie").mockReturnValue({
        ...testMember,
        api_choice: "REST",
      });
      mockFetch.mockResolvedValueOnce({ ok: true });
      const result = await setAPIChoice(GRAPHQL_API);
      expect(result).toBe(true);
    });
    it("returns false on failure", async () => {
      jest.spyOn(cookieUtils, "getUserFromCookie").mockReturnValue({
        ...testMember,
        api_choice: "REST",
      });
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await setAPIChoice(GRAPHQL_API);
      expect(result).toBe(false);
    });
    it("returns false with no user", async () => {
      jest.spyOn(cookieUtils, "getUserFromCookie").mockReturnValue(null);
      const result = await setAPIChoice(GRAPHQL_API);
      expect(result).toBe(false);
    });
  });

  describe("getUser", () => {
    it("returns user and sets cookie", async () => {
      const user = { username: "test_user" };
      jest.spyOn(cookieUtils, "getUserFromCookie").mockReturnValue(testMember);
      const setCookieSpy = jest
        .spyOn(cookieUtils, "setCookie")
        .mockImplementation(jest.fn());
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...user, cart: [] }),
      });
      const result = await getUser();
      expect(result).toEqual({ username: "test_user", cart: [] });
      expect(setCookieSpy).toHaveBeenCalled();
    });
    it("returns null if no cookie user", async () => {
      jest.spyOn(cookieUtils, "getUserFromCookie").mockReturnValue(null);
      const result = await getUser();
      expect(result).toBeNull();
    });
    it("returns null if fetch fails", async () => {
      jest.spyOn(cookieUtils, "getUserFromCookie").mockReturnValue(testMember);
      mockFetch.mockResolvedValueOnce({ ok: false });
      const result = await getUser();
      expect(result).toBeNull();
    });
  });
});
