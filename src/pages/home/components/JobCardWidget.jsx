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
