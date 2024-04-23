import { Link } from "react-router-dom";
import JobCardWidget from "./JobCardWidget";
import { salaryFormat } from "@/utils/utils";
import { dateFormat } from "@/utils/utils";
import { LuBriefcase } from "react-icons/lu";
import {
  IoEarthOutline,
  IoTimeOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { urlFormat } from "@/utils/utils";

function JobList({ displayedJobs }) {
  return (
    <>
      {displayedJobs.length != 0 ? displayedJobs.map((job) => (
        <Link key={job.id} to={`/jobs/${urlFormat(job.jobTitle)}/${job.id}`}>
          <JobCardWidget>
            <JobCardWidget.JobCardImage
              src={job.companyLogo}
              alt={job.company}
            />
            <div className="relative flex-grow">
              <JobCardWidget.JobCardTitle>
                <h2 className="font-bold text-2xl">{job.jobTitle}</h2>
                <p className="font-semibold text-lg text-gray-500 mb-3">
                  {job.company}
                </p>
              </JobCardWidget.JobCardTitle>
              <JobCardWidget.JobCardList>
                <JobCardWidget.JobCardItem className="flex items-center md:absolute md:top-0 md:right-0 md:bg-gray-200 md:py-1 md:px-2 md:text-center md:rounded-md">
                  <LuBriefcase className="me-1 text-lg md:hidden" />
                  {job.jobType}
                </JobCardWidget.JobCardItem>
                <JobCardWidget.JobCardItem className="flex items-center">
                  <IoLocationOutline className="me-1 text-lg" /> {job.location}
                </JobCardWidget.JobCardItem>
                <JobCardWidget.JobCardItem className="flex items-center">
                  <IoEarthOutline className="me-1 text-lg" />
                  {job.officeLocation.substring(0, 30)}
                </JobCardWidget.JobCardItem>
                <JobCardWidget.JobCardItem className="flex items-center">
                  <PiCurrencyCircleDollar className="me-1 text-lg" />
                  {salaryFormat(job.salary)}
                </JobCardWidget.JobCardItem>
                <JobCardWidget.JobCardItem className="flex items-center md:absolute bottom-0 right-0">
                  <IoTimeOutline className="me-1 text-lg" />
                  {dateFormat(job.createdAt.seconds)}
                </JobCardWidget.JobCardItem>
              </JobCardWidget.JobCardList>
            </div>
          </JobCardWidget>
        </Link>
      )) : <p className="text-lg font-semibold">No job offers match your search</p>}
    </>
  );
}

export default JobList;
