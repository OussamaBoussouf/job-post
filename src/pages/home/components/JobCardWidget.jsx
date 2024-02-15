import appleLogo from "@/assets/img/apple-logo.jpg";
import { LuBriefcase } from "react-icons/lu";
import {
  IoEarthOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";


function JobCardWidget({image,company, position, officeLocation, location, jobType, salary}) {
  return (
    <div className="flex items-center justify-between mb-5 p-4 border-[1px] rounded-md hover:bg-gray-50">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt="apple logo"
          width="100"
          height="100"
          className="rounded-xl ms-2 object-cover"
        />
        <div>
          <h2 className="font-bold text-2xl">{position}</h2>
          <p className="font-semibold text-lg text-gray-500 mb-3">{company}</p>
          <ul className="text-gray-500">
            <li className="flex items-center md:hidden">
              <LuBriefcase className="me-1 text-lg" /> <span>{jobType}</span>
            </li>
            <li className="flex items-center">
              <IoLocationOutline className="me-1 text-lg" /> {location}
            </li>
            <li className="flex items-center">
              <IoEarthOutline className="me-1 text-lg" /> {officeLocation}
            </li>
            <li className="flex items-center">
              <PiCurrencyCircleDollar className="me-1 text-lg" /> $ {salary}
            </li>
            <li className="flex items-center md:hidden">
              <IoTimeOutline className="me-1 text-lg" /> 1 day ago
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden text-gray-600 sm:block sm:space-y-20">
        <div className="bg-gray-200 border-[1px] py-1 px-2 rounded-md">{jobType}</div>
        <div className="flex items-center">
          <IoTimeOutline className="me-1 text-lg" /> 1 day ago
        </div>
      </div>
    </div>
  );
}

export default JobCardWidget;
