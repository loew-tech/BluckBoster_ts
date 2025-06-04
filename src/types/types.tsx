export type Movie = {
  id: string;
  title: string;
  cast: string[];
  director: string;
  inventory?: number;
  rented?: number;
  rating?: string;
  review?: string;
  synopsis: string;
  trivia?: string;
  year: string;
};

export type Member = {
  username: string;
  first_name: string;
  last_name?: string;
  cart?: string[];
  checked_out?: string[];
  rented?: string[];
  type?: string;
};
