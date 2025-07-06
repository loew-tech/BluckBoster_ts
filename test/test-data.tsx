import { KevinBaconResponse, Member, Movie } from "../src/types/types";

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
    inventory: 0,
    rented: 4,
    rating: "99%",
    review:
      " An undisputed masterpiece and perhaps Hollywood's quintessential statement on love and romance, ",
    synopsis:
      "Rick Blaine (Humphrey Bogart), who owns a nightclub in Casablanca, discovers his old flame Ilsa (Ingrid Bergman) is in town...",
    title: "Casablanca",
    year: "1942",
  },
  {
    cast: [
      "Toshiro Mifune",
      "Takashi Shimura",
      "Yoshio Inaba",
      "Seiji Miyaguchi",
    ],
    director: "Akira Kurosawa",
    id: "seven_samurai_1954",
    inventory: 5,
    rating: "100%",
    review:
      " Arguably Akira Kurosawa's masterpiece, The Seven Samurai is an epic adventure classic with an engrossing story, memorable characters, and stunning action sequences that make it one of the most influential films ever made.",
    synopsis:
      " A samurai answers a village's request for protection after he falls on hard times. The town needs protection from bandits,...",
    title: "Seven Samurai",
    year: "1954",
  },
];

export const testMovieIDs: string[] = [
  "casablanca_1942",
  "l.a._confidential_1997",
];

export const testCart: string[] = ["l.a._confidential_1997"];

export const testMember: Member = {
  first_name: "Sea",
  last_name: "captain",
  username: "sea_captain",
  type: "advanced",
  cart: testCart,
  checked_out: [testMovieIDs[0]],
};

export const TestKevinBaconResponse: KevinBaconResponse = {
  stars: ["Kevin Bacon"],
  total_stars: 1,
  movies: [
    {
      title: "Footloose",
      year: "1984",
      id: "footloose_1984",
      cast: ["Kevin Bacon", "Lori Singer"],
      director: "Herbert Ross",
      inventory: 2,
      rented: 0,
      rating: "72%",
      review: "A classic dance movie.",
      synopsis:
        "A city teenager moves to a small town where rock music and dancing have been banned.",
    },
  ],
  total_movies: 1,
  directors: ["Herbert Ross"],
  total_directors: 100,
};
