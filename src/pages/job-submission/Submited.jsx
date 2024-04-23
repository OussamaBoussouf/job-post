import Footer from "../layouts/Footer";
import Navbar from "../layouts/Navbar";

function Submited() {
  return (
    <>
      <div className="my-10">
        <h1 className="text-center font-extrabold text-3xl mb-4 md:text-5xl">
          Job submitted
        </h1>
        <p className="text-center text-gray-400">
            Your job posting has been submitted and is pending approval.
        </p>
      </div>
    </>
  );
}

export default Submited;
