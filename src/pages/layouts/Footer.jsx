import Wrapper from "@/components/Wrapper";

function Footer() {
  return (
    <footer className="my-5 px-4">
      <Wrapper>
        <div className=" md:flex md:items-center md:justify-between mb-4">
          <div className="mb-3">
            <h3 className="font-bold text-xl mb-2 ">Flow Jobs</h3>
            <span className="text-gray-500 font-semibold text-sm">
              Connecting talents with opportunities
            </span>
          </div>
          <ul className="flex items-center justify-between text-sm text-gray-500 md:font-semibold md:space-x-3">
            <li>About Us</li>
            <li>Contact</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <p className="text-gray-500 text-center">
          &copy; 2024 Flow Jobs, Inc. All rights reserved
        </p>
      </Wrapper>
    </footer>
  );
}

export default Footer;
