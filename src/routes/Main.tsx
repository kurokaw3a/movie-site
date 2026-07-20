import { Route, Routes } from "react-router";
import { MainLayout } from "../layout/Main";
import { HomePage } from "../pages/Home";
import { OverviewPage } from "../pages/Overview";

export const Main = () => {
  return (
    <Routes>
      <Route path="" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="movies/:id/:title" element={<OverviewPage />} />
        <Route path="tv/:id/:title" element={<OverviewPage tv />} />
      </Route>
    </Routes>
  );
};
