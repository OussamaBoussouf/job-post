import { Button } from "@/components/ui/button";
import logo from "../../../assets/img/logo.png";

function Navbar() {
  return (
    <nav>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo} alt="logo" width="50" />
            <p className="font-bold ms-2">Flow Jobs</p>
          </div>
          <Button type="button">Post a job</Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
