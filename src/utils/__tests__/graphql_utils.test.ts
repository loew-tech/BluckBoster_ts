import { testMember } from "../../../test/test-data";
import {
  login,
  checkout,
  fetchMovies,
  fetchCart,
  fetchMovie,
  returnRentals,
  updateCart,
  setAPIChoice,
  fetchCheckedoutMovies,
  getUser,
  starredWith,
  starredIn,
  directedActors,
  directedMovies,
  kevinBacon,
} from "../../utils/graphql_utils";

jest.mock("../../utils/cookieUtils", () => ({
  getUserFromCookie: jest.fn(() => ({ username: "test_user" })),
  setCookie: jest.fn(),
}));

global.fetch = jest.fn();
const mockFetch = fetch as jest.Mock;

describe("graphql_utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("login - returns user on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ username: "test_user" }),
    });
    const result = await login("test_user");
    expect(result).toEqual({ username: "test_user" });
  });
  it("login - returns null on failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await login("bad_user");
    expect(result).toBeNull();
  });
  it("checkout - returns true on success", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    const result = await checkout("test_user", ["id1"]);
    expect(result).toBe(true);
  });
  it("checkout - returns false on failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await checkout("test_user", ["bad_id"]);
    expect(result).toBe(false);
  });
  it("fetchMovies - returns movie array", async () => {
    const movies = [{ id: "m1", title: "Movie 1" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { GetMovies: movies } }),
    });
    const result = await fetchMovies("A");
    expect(result).toEqual(movies);
  });
  it("fetchMovies - returns empty array on failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await fetchMovies("A");
    expect(result).toEqual([]);
  });
  it("fetchCart - returns cart items", async () => {
    const cart = [{ id: "id1", title: "Cart Movie" }];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { GetCart: cart } }),
    });
    const result = await fetchCart("test_user");
    expect(result).toEqual(cart);
  });
  it("fetchMovie - returns single movie", async () => {
    const movie = { id: "id1", title: "Movie" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { GetMovie: movie } }),
    });
    const result = await fetchMovie("id1");
    expect(result).toEqual(movie);
  });
  it("returnRentals - returns true on success", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    const result = await returnRentals("test_user", ["id1"]);
    expect(result).toBe(true);
  });
  it("returnRentals - returns false on failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await returnRentals("test_user", ["bad_id"]);
    expect(result).toBe(false);
  });
  it("updateCart - adds and removes from cart", () => {
    const added = updateCart("user", "id3", ["id1", "id2"], false);
    expect(added).toEqual(["id1", "id2", "id3"]);

    const removed = updateCart("user", "id2", ["id1", "id2"], true);
    expect(removed).toEqual(["id1"]);
  });
  it("setAPIChoice - returns true on success", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    const result = await setAPIChoice("GraphQL");
    expect(result).toBe(true);
  });
  it("setAPIChoice - returns false on failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await setAPIChoice("GraphQL");
    expect(result).toBe(false);
  });
  it("getUser - returns user from API", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          GetMember: { username: "test_user", cart: [], checked_out: [] },
        },
      }),
    });
    const result = await getUser();
    expect(result).toEqual({
      username: "test_user",
      cart: [],
      checked_out: [],
    });
  });
  it("fetchCheckedoutMovies - returns movies on success", async () => {
    const checkedOut = testMember.checked_out;
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { GetCheckedout: checkedOut },
      }),
    });
    const result = await fetchCheckedoutMovies(testMember.username);
    expect(result).toEqual(checkedOut);
  });
  it("fetchCheckedoutMovies - returns empty array on failure", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });
    const result = await fetchCheckedoutMovies("test_user");
    expect(result).toEqual([]);
  });
  it("starredWith - returns actors", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { StarredWith: ["Actor A"] } }),
    });
    const result = await starredWith("Star");
    expect(result).toEqual(["Actor A"]);
  });
  it("starredIn - returns movies", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { StarredIn: [{ id: "1", title: "Movie" }] },
      }),
    });
    const result = await starredIn("Star");
    expect(result).toEqual([{ id: "1", title: "Movie" }]);
  });
  it("directedActors - returns actors", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { DirectedPerformers: ["Actor X"] } }),
    });
    const result = await directedActors("Director");
    expect(result).toEqual(["Actor X"]);
  });
  it("directedMovies - returns movies", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { DirectedMovies: [{ id: "1", title: "Directed Movie" }] },
      }),
    });
    const result = await directedMovies("Director");
    expect(result).toEqual([{ id: "1", title: "Directed Movie" }]);
  });
  it("kevinBacon - returns traversal results", async () => {
    const mockResult = {
      star: "Chris Evans",
      stars: ["A", "B"],
      total_stars: 2,
      movies: [{ id: "1", title: "Some Movie" }],
      total_movies: 1,
      directors: ["Spielberg"],
      total_directors: 1,
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { KevinBacon: mockResult },
      }),
    });
    const result = await kevinBacon("Chris Evans");
    expect(result).toEqual(mockResult);
  });
});
