import { Movie } from "../types/types";

/**
 * Bundled fallback pool, used only when the movie API is unreachable or
 * returns no movies with trivia. The game always tries the API first.
 */
export const fallbackTriviaMovies: Movie[] = [
  {
    id: "casablanca_1942",
    title: "Casablanca",
    cast: ["Humphrey Bogart", "Ingrid Bergman", "Paul Henreid", "Claude Rains"],
    director: "Michael Curtiz",
    year: "1942",
    synopsis:
      "A cynical expatriate cafe owner struggles to decide whether to help his former lover and her husband escape the Nazis.",
    trivia:
      ":Which song does Sam play again at Ilsa's request?: As Time Goes By.&:&:What was this film's original working title?: Everyone Comes to Rick's.",
  },
  {
    id: "the_shawshank_redemption_1994",
    title: "The Shawshank Redemption",
    cast: ["Tim Robbins", "Morgan Freeman"],
    director: "Frank Darabont",
    year: "1994",
    synopsis:
      "A banker sentenced to life in prison forms an unlikely friendship and holds on to hope over decades behind bars.",
    trivia:
      ":What does Andy hide inside a hollowed-out Bible?: A small rock hammer.&:&:Which opera duet does Andy broadcast over the prison loudspeakers?: The Marriage of Figaro.",
  },
  {
    id: "pulp_fiction_1994",
    title: "Pulp Fiction",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"],
    director: "Quentin Tarantino",
    year: "1994",
    synopsis:
      "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    trivia:
      ":What dance contest do Vincent and Mia enter at Jack Rabbit Slim's?: A twist contest.&:&:What is written on Jules's wallet?: Bad Motherfucker.",
  },
  {
    id: "the_godfather_1972",
    title: "The Godfather",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    director: "Francis Ford Coppola",
    year: "1972",
    synopsis:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.",
    trivia:
      ":What does a movie producer find in his bed as a warning?: The severed head of his prized racehorse.&:&:What fruit is used to foreshadow danger or death throughout the film?: Oranges.",
  },
  {
    id: "spirited_away_2001",
    title: "Spirited Away",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    director: "Hayao Miyazaki",
    year: "2001",
    synopsis:
      "A young girl wanders into a bathhouse for spirits and must work there to free herself and her parents.",
    trivia:
      ":What must Chihiro give up to work at the bathhouse?: Her name, which Yubaba shortens to Sen.&:&:What does the faceless spirit No-Face offer the bathhouse workers?: Gold nuggets.",
  },
  {
    id: "parasite_2019",
    title: "Parasite",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik"],
    director: "Bong Joon Ho",
    year: "2019",
    synopsis:
      "A poor family schemes its way into the employ of a wealthy household, setting off an unexpected chain of events.",
    trivia:
      ":What object does Min-hyuk give Ki-woo as a lucky gift?: A scholar's rock.&:&:What secret space is hidden inside the wealthy family's house?: An underground bunker.",
  },
  {
    id: "mad_max_fury_road_2015",
    title: "Mad Max: Fury Road",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"],
    director: "George Miller",
    year: "2015",
    synopsis:
      "In a post-apocalyptic wasteland, a drifter and a fearless driver flee a tyrant who controls the land's water.",
    trivia:
      ":What is the name of the war rig's driver who turns against Immortan Joe?: Imperator Furiosa.&:&:What do the War Boys spray on their mouths before a glorious death?: Chrome spray paint.",
  },
  {
    id: "seven_samurai_1954",
    title: "Seven Samurai",
    cast: ["Toshiro Mifune", "Takashi Shimura", "Seiji Miyaguchi"],
    director: "Akira Kurosawa",
    year: "1954",
    synopsis:
      "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    trivia:
      ":How do the villagers first recruit samurai when they have no money to pay?: They offer them rice, three meals a day.&:&:Which samurai is revealed to actually be a farmer's son, not born a samurai?: Kikuchiyo.",
  },
];
