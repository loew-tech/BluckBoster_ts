import { Member, Movie } from "../src/types/types";

export const testMovies: Movie[] = [
  {
    cast: ["Kevin Spacey", "Russell Crowe", "Guy Pearce", "James Cromwell"],
    director: "Curtis Hanson",
    id: "l.a._confidential_1997",
    inventory: 5,
    rented: 0,
    rating: "99%",
    review: "foo",
    synopsis: "bar",
    title: "L.A. Confidential",
    year: "1997",
  },
  {
    cast: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid", "Claude Rains"],
    director: "Michael Curtiz",
    id: "casablanca_1942",
    inventory: 4,
    rented: 0,
    rating: "99%",
    review:
      " An undisputed masterpiece and perhaps Hollywood's quintessential statement on love and romance, ",
    synopsis:
      "Rick Blaine (Humphrey Bogart), who owns a nightclub in Casablanca, discovers his old flame Ilsa (Ingrid Bergman) is in town...",
    title: "Casablanca",
    year: "1942",
  },
];

export const testMovieIDs: string[] = [
  "casablanca_1942",
  "l.a._confidential_1997",
];

export const testCart: string[] = ["casablanca_1942"];

export const testMember: Member = {
  first_name: "Sea",
  last_name: "captain",
  username: "sea_captain",
  type: "advanced",
  cart: testCart,
  checked_out: testMovieIDs,
};
