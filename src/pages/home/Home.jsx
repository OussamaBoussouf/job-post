import Footer from "../layouts/Footer";
import MainContent from "./MainContent";
import Navbar from "../layouts/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <hr />
      <MainContent />
      <hr />
      <Footer/>
    </>
  );
};

export default Home;
