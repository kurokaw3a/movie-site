import { NavLink, Outlet } from "react-router";
import search_icon from "../assets/search.svg";
import { useState, type ChangeEvent } from "react";
import { useGetSearchMovieQuery, useGetSearchTvQuery } from "../pages/api";
import { useDebounceCallback } from "../hooks/useDebounce";

export const MainLayout = () => {
  const [language, setLanguage] = useState<string>(
    String(localStorage.getItem("justwatchlanguage")) || "en",
  );
  const languageHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    localStorage.setItem("justwatchlanguage", e.target.value);
    window.location.reload();
  };
  const paths = [
    `${language === "en" ? "Movies" : "Фильмы"}/movies`,
    `${language === "en" ? "Tv" : "Сериалы"}/tv`,
    `${language === "en" ? "Genres" : "Жанры"}/genres`,
  ];

  const [keyword, setKeyword] = useState<string>("");
  const keywordHandler = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    500,
  );
  const { data: movieResult } = useGetSearchMovieQuery(keyword);
  const { data: tvResult } = useGetSearchTvQuery(keyword);

  const result = movieResult?.results
    .concat(tvResult ? tvResult.results : [])
    .sort((a, b) => b.vote_average - a.vote_average);

  const goToMedia = () => {
    setKeyword("");
  };
  return (
    <div style={{ isolation: "isolate" }}>
      <header className="bg-linear-to-b from-[#00000050] to-transparent flex items-center h-22 md:pl-20 md:pr-20 pl-10 pr-10">
        <div className="container">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-10">
              <NavLink
                to="/"
                className="hidden md:block text-xl text-yellow-400"
              >
                Justwatch
              </NavLink>
              <nav className="hidden md:flex gap-10 text-white">
                {paths.map((el, i) => (
                  <NavLink
                    key={i}
                    to={el.slice(el.search("/"))}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#ffffff90]"
                        : "transition duration-200 hover:text-[#ffffff90]"
                    }
                  >
                    {el.slice(0, el.search("/"))}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="flex items-baseline gap-10">
              <div className="flex items-center">
                <img
                  src={search_icon}
                  alt="s_icon"
                  className="w-7 absolute pl-2"
                />
                <input
                  type="search"
                  onChange={keywordHandler}
                  placeholder={
                    language === "en"
                      ? "Search movies, tv and more"
                      : "Найти фильмы, сериалы"
                  }
                  className="w-40 md:w-80 border border-[#ffffff50] rounded text-white outline-none p-1 pl-8 pr-3"
                />
              </div>

              <div className="flex flex-col gap-3 absolute z-2 mt-9 w-80 h-max max-h-120 overflow-y-scroll bg-[#1a1a1a] rounded">
                {result?.map(
                  (el, i) =>
                    el.poster_path && (
                      <NavLink
                        onClick={goToMedia}
                        to={`${el.name ? "tv" : "movies"}/${String(el.id)}/${el.name ?? el.title}`}
                        className="flex gap-2 p-3 pt-1 pb-1 transition duration-300 hover:bg-stone-700"
                        key={i}
                      >
                        <img
                          className="w-20"
                          src={`https://image.tmdb.org/t/p/w1280/${el.poster_path}`}
                          alt=""
                        />
                        <h1 className="text-white">{el.name ?? el.title}</h1>
                      </NavLink>
                    ),
                )}
              </div>
              {keyword && (
                <div
                  onClick={() => {
                    setKeyword("");
                  }}
                  className="absolute top-0 bottom-0 left-0 right-0 z-1"
                />
              )}
              <div>
                <select
                  onChange={languageHandler}
                  className="text-white cursor-pointer"
                >
                  <option selected={language === "ru"} value="ru">
                    Russian
                  </option>
                  <option selected={language === "en"} value="en">
                    English
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="p-10 md:pl-20 md:pr-20">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
