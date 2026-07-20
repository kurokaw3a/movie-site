import { baseApi } from "../api/baseApi";
import type { IMedia, MovieDetails } from "./types";

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrending: builder.query<IMedia, string>({
      query: (page: string) =>
        `/trending/all/day?language=${String(localStorage.getItem("justwatchlanguage"))}&page=${page}`,
    }),
    getSearchMovie: builder.query<IMedia, string>({
      query: (keyword: string) =>
        `/search/movie?query=${keyword}&language=${String(localStorage.getItem("justwatchlanguage"))}`,
    }),
    getSearchTv: builder.query<IMedia, string>({
      query: (keyword: string) =>
        `/search/tv?query=${keyword}&language=${String(localStorage.getItem("justwatchlanguage"))}`, // /[A-za-zA-Z]/.test(keyword) ? "en" : "ru"
    }),
    getMovieById: builder.query<MovieDetails, string>({
      query: (id: string) =>
        `/movie/${id}?language=${String(localStorage.getItem("justwatchlanguage"))}`,
    }),
    getTvById: builder.query<MovieDetails, string>({
      query: (id: string) =>
        `/tv/${id}?language=${String(localStorage.getItem("justwatchlanguage"))}`,
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useGetMovieByIdQuery,
  useGetTvByIdQuery,
  useGetSearchMovieQuery,
  useGetSearchTvQuery,
} = homeApi;
