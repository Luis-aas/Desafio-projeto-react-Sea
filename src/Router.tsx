import { Route, Routes } from "react-router-dom";
import { Edit } from "./pages/Edit/Edit";
import { Enterprise } from "./pages/Enterprise/Enterprise";
import { TimeLoop } from "./pages/Timeloop/Timeloop";
import { DefaultLayout } from "./layouts/DefaultLayouts";
import { Sitemap } from "./pages/Sitemap/Sitemap";
import { Notifications } from "./pages/Notifications/Notifications";
import { User } from "./pages/User/User";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/enterprise" element={<Enterprise />} />
                <Route path="/" element={<Edit />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/timeloop" element={<TimeLoop />} />
                <Route path="/user" element={<User />} />
            </Route>
        </Routes>
    )
}