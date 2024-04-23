import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";


function PageStructure() {
    return (
        <>
            <Navbar/>
            <hr />
            <Outlet/>
            <hr />
            <Footer/>
        </>
    );
}

export default PageStructure;