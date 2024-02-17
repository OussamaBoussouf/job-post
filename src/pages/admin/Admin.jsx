import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import MainContent from "./components/MainContent";

function Admin() {

  return (
    <div>
      <Navbar/>
      <hr />
      <MainContent/>
      <hr />
      <Footer/>
    </div>
  );
}

export default Admin;
