import { Button } from "@/components/ui/button";
import logo from "@/assets/img/logo.png";
import Wrapper from "@/components/Wrapper";

function Navbar() {
  return (
    <nav className="mb-5 px-4">
      <Wrapper>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="logo" width="50" />
            <p className="font-bold ms-2">Flow Jobs</p>
          </div>
          <Button type="button">Post a job</Button>
        </div>
      </Wrapper>
    </nav>
  );
}

export default Navbar;
