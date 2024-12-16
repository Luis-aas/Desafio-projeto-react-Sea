import { Outlet, useLocation } from "react-router-dom";
import { Siderbar } from "../components/Siderbar/Siderbar";
import "./DefaultLayouts.css"

export function DefaultLayout(){
    const location = useLocation();

    // Verifica se a rota atual é a página de edição
    const isHomePage = location.pathname === "/";

    return(
        <div className={`body-pages ${isHomePage ? "edit-page" : ""}`}>
            <Siderbar/>
            <Outlet />
        </div>
    )
}