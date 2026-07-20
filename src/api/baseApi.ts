import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

interface RefreshResponse {
  access: string;
  refresh?: string;
}

function isRefreshResponse(obj: unknown): obj is RefreshResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "access" in obj &&
    typeof (obj as Record<string, unknown>).accessToken === "string"
  );
}

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.themoviedb.org/3/",
  prepareHeaders: (headers) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDUzYmFkOWQxNjBiMjgwYjVhODE0MmJjZmYyY2QyNSIsInN1YiI6IjY1ZDFjZTQ1YjQyMjQyMDE4N2IyZWVjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J249OrEFbORZCdeQ0LkjDkb8syAW-jduz6H1KKNOR5g";
    headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/login/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data && isRefreshResponse(refreshResult.data)) {
        const { access, refresh } = refreshResult.data;

        localStorage.setItem("token", access);
        if (refresh) {
          localStorage.setItem("refresh", refresh);
        }

        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh");
        window.location.href = "/";
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: () => ({}),
});
