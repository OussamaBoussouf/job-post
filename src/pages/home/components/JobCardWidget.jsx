import { LuBriefcase } from "react-icons/lu";
import {
  IoEarthOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";


function JobCardWidget({
  children
}) {
  return (
    <div className="flex items-center justify-between mb-5 p-4 border-[1px] rounded-md hover:bg-gray-50">
      <div className="flex items-center gap-3 w-full">
        {children}
        {/* <img
          src={companyLogo}
          alt={`${company} logo`}
          width="100"
          height="100"
          className="rounded-xl ms-2 object-cover"
        />
        <div>
          <h2 className="font-bold text-2xl">{jobTitle}</h2>
          <p className="font-semibold text-lg text-gray-500 mb-3">{company}</p>
          <ul className="text-gray-500">
            <li className="flex items-center md:hidden">
              <LuBriefcase className="me-1 text-lg" /> {jobType}
            </li>
            <li className="flex items-center">
              <IoLocationOutline className="me-1 text-lg" /> {location}
            </li>
            <li className="flex items-center">
              <IoEarthOutline className="me-1 text-lg" />
              {officeLocation != "" ? officeLocation : "Worldwide"}
            </li>
            <li className="flex items-center">
              <PiCurrencyCircleDollar className="me-1 text-lg" />
              {salaryFormat(salary)}
            </li>
            <li className="flex items-center md:hidden">
              <IoTimeOutline className="me-1 text-lg" />
              {dateFormat(createdAt.seconds)}
            </li>
          </ul>
        </div>
      </div> */}
        {/* <div className="hidden text-gray-600 sm:block sm:space-y-20">
        <div className="bg-gray-200 py-1 px-2 text-center rounded-md">
          {jobType}
        </div>
        <div className="flex items-center">
          <IoTimeOutline className="me-1 text-lg" />
          {dateFormat(createdAt.seconds)}
        </div> */}
      </div>
    </div>
  );
}

const JobCardImage = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={`${alt} logo`}
      width="100"
      height="100"
      className="rounded-xl ms-2 object-cover"
    />
  );
};

const JobCardTitle = ({ children }) => {
  return <>{children}</>;
};

const JobCardList = ({ children }) => {
  return <ul className="text-gray-500">{children}</ul>;
};

const JobCardItem = ({ children, className }) => {
  return <li className={className}>{children}</li>;
};

JobCardWidget.JobCardImage = JobCardImage;
JobCardWidget.JobCardTitle = JobCardTitle;
JobCardWidget.JobCardList = JobCardList;
JobCardWidget.JobCardItem = JobCardItem;

export default JobCardWidget;
