// paths
export const checkoutPath = "/checkout";
export const moviesPath = "/movies";
export const memberPath = "/member";
export const loginPath = "/login";
export const ExplorePath = "/explore";
export const RecEnginePath = "/recommendation";

// API URIs
export const memberURI = "http://127.0.0.1:8080/api/v1/members";
export const memberLoginURI = "http://127.0.0.1:8080/api/v1/members/login";
export const moviesURI = "http://127.0.0.1:8080/api/v1/movies";
export const checkoutURI = "http://127.0.0.1:8080/api/v1/members/checkout";
export const returnURI = "http://127.0.0.1:8080/api/v1/members/return";
export const cartURI = "http://127.0.0.1:8080/api/v1/members/cart";
export const cartRemoveURI = "http://127.0.0.1:8080/api/v1/members/cart/remove";
export const votingInitialSlateURI =
  "http://127.0.0.1:8080/api/v1/members/mood/initial_voting";
export const iterateVoteURI = "http://127.0.0.1:8080/api/v1/members/mood/vote";
export const finalRecommendationsURI =
  "http://127.0.0.1:8080/api/v1/members/mood/picks";

// API types
export const REST_API = "REST";
export const GRAPHQL_API = "GraphQL";

// KevinBacon properties
export const DIRECTOR = "director";
export const STAR = "star";
export const KEVIN_BACON = "KevinBacon";

// cookie and context names
export const USER = "user";
export const CART = "cart";
export const COOKIE_CONSENT = "cookie_consent";
export const COOKIE_EXPIRY_DAYS = 7;
export const ADD_TO_CART = false;
export const REMOVE_FROM_CART = true;
