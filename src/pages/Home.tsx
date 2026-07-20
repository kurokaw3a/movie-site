import { NavLink } from "react-router";
import { useGetTrendingQuery } from "./api";
import { useState } from "react";

export const HomePage = () => {
  const [page, setPage] = useState<number>(
    Number(localStorage.getItem("justwatchpage")) || 1,
  );

  const { data } = useGetTrendingQuery(page.toString());

  const prevPage = () => {
    if (page > 1)
      setPage((prev) => {
        localStorage.setItem("justwatchpage", (prev - 1).toString());
        return prev - 1;
      });
  };
  const nextPage = () => {
    setPage((prev) => {
      localStorage.setItem("justwatchpage", (prev + 1).toString());
      return prev + 1;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <section className="flex flex-col gap-5">
        <h1 className="text-xl text-white">
          {localStorage.getItem("justwatchlanguage") === "en"
            ? "Trending"
            : "В тренде"}
        </h1>
        <div className="grid xs:grid-cols-3 xs:gap-3 md:grid-cols-5 md:gap-5 sm:grid-cols-4 sm:gap-4 grid-cols-2 gap-2">
          {data?.results.map((el, i) => (
            <NavLink
              to={`${el.media_type === "movie" ? "movies" : "tv"}/${String(el.id)}/${el.name ?? el.title}`}
              key={i}
            >
              <img
                className="w-35 md:w-60 transition duration-200 hover:-translate-y-3 cursor-pointer select-none"
                src={`https://image.tmdb.org/t/p/w1280/${el.poster_path}`}
                alt="poster"
              />
            </NavLink>
          ))}
        </div>
      </section>
      <footer className="flex justify-center">
        <div className="flex gap-3">
          <div
            onClick={prevPage}
            className="flex text-white bg-zinc-800 p-2 pt-0 pb-0 rounded cursor-pointer"
          >
            {page}
          </div>
          <div
            onClick={nextPage}
            className="flex text-white bg-zinc-800 p-2 pt-0 pb-0 rounded cursor-pointer"
          >
            {page + 1}
          </div>
        </div>
      </footer>
    </div>
  );
};
