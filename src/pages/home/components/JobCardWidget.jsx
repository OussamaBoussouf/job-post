import appleLogo from "@/assets/img/apple-logo.jpg";
import { LuBriefcase } from "react-icons/lu";
import {
  IoEarthOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";

function JobCardWidget() {
  return (
    <div className="flex items-center justify-between p-4 border-[1px] rounded-md hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <img
          src={appleLogo}
          alt="apple logo"
          width="100"
          className="rounded-xl ms-2"
        />
        <div>
          <h2 className="font-bold text-2xl">Full-Stack Developer at Apple</h2>
          <p className="font-semibold text-lg text-gray-500 mb-3">Appel</p>
          <ul className="text-gray-500">
            <li className="flex items-center md:hidden">
              <LuBriefcase className="me-1 text-lg" /> <span>Full-time</span>
            </li>
            <li className="flex items-center">
              <IoLocationOutline className="me-1 text-lg" /> Hybrid
            </li>
            <li className="flex items-center">
              <IoEarthOutline className="me-1 text-lg" /> San Francisco,
              California
            </li>
            <li className="flex items-center">
              <PiCurrencyCircleDollar className="me-1 text-lg" /> $ 120,000.00
            </li>
            <li className="flex items-center md:hidden">
              <IoTimeOutline className="me-1 text-lg" /> 1 day ago
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden text-gray-600 md:block md:space-y-20">
        <span className="bg-gray-200 border-[1px] py-1 px-2 rounded-md">Full-time</span>
        <span className="flex items-center">
          <IoTimeOutline className="me-1 text-lg" /> 1 day ago
        </span>
      </div>
    </div>
  );
}

export default JobCardWidget;
