import { Button } from "@/components/ui/button";
import logo from "@/assets/img/logo.png";
import Wrapper from "@/components/Wrapper";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="mb-5 px-4">
      <Wrapper>
        <div className="flex items-center justify-between">
          <Link to="/" >
            <div className="flex items-center">
              <img src={logo} alt="computer logo" width="50" height="50" />
              <p className="font-bold ms-2">Flow Jobs</p>
            </div>
          </Link>
          <Link to="/jobs/new">
            <Button type="button">Post a job</Button>
          </Link>
        </div>
      </Wrapper>
    </nav>
  );
}

export default Navbar;
