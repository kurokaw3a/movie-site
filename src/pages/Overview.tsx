import { useParams } from "react-router";
import { useGetMovieByIdQuery, useGetTvByIdQuery } from "./api";

export const OverviewPage = ({ tv }: { tv?: boolean }) => {
  const { id } = useParams();

  const { data } = tv
    ? useGetTvByIdQuery(id ?? "")
    : useGetMovieByIdQuery(id ?? "");

  return (
    data && (
      <div>
        <div
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/${data.backdrop_path}')`,
          }}
          className={`absolute -z-1 left-0 top-0 w-full h-screen bg-cover bg-center shadow-[inset_0px_90px_90px_30px_#1a1a1a] blur-xs`}
        ></div>
        <img
          className="w-40 md:w-80"
          src={`https://image.tmdb.org/t/p/w1280/${data.poster_path}`}
          alt=""
        />
        <h1 className="text-white">{data.name ?? data.title}</h1>
      </div>
    )
  );
};
