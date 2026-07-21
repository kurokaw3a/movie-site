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
          className={`absolute -z-1 left-0 top-0 w-full h-screen bg-cover shadow-[inset_0px_90px_90px_30px_#1a1a1a] brightness-50`}
        />
        <div className="flex flex-col xs:flex-row ">
          {/* <img
            className="w-40 sm:w-60 md:w-80 h-max rounded-xl"
            src={`https://image.tmdb.org/t/p/w1280/${data.poster_path}`}
            alt=""
          /> */}
          <div className="text-white flex flex-col gap-3 ">  {/*bg-[#1a1a1a50] rounded-xl p-3 */}
            <h1 className="text-6xl max-w-4xl font-semibold">{data.name ?? data.title}</h1>
            <p className="text-cyan-300 italic">{data.tagline}</p>
            <p className="xs:text-xs md:text-[1rem] md:max-w-125">
              {data.overview}
            </p>
            <div className="text-white">
              <p>{data.vote_average.toFixed(1)} </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
