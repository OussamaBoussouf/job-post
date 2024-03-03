import FilterJobWidget from "@/pages/home/components/FilterJobWidget";
import Wrapper from "@/components/Wrapper";
import JobCardWidget from "./components/JobCardWidget";
import PaginationWidget from "./components/PaginationWidget";
import { db, storage } from "@/firebaseStore";
import { useEffect, useState } from "react";
import {
  collection,
  endBefore,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const jobsRef = collection(db, "jobs");

function MainContent() {
  const [allJobs, setAllJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalPage, setTotalPage] = useState(0);
  const pageSize = 4;

  const nextPage = () => {
    const newItems = allJobs.slice(
      pageSize * parseInt(currentPage),
      currentJobs.length * (parseInt(currentPage) + 1)
    );
    setCurrentJobs(newItems);
    setSearchParams({ page: parseInt(currentPage) + 1 });
    setCurrentPage(parseInt(currentPage) + 1);
  };

  const previousPage = () => {
    const newItems = allJobs.slice(
      pageSize * (parseInt(currentPage) - 1) - pageSize,
      pageSize * (parseInt(currentPage) - 1)
    );
    setCurrentJobs(newItems);
    setCurrentPage(parseInt(currentPage) - 1);
    if (searchParams.get("page") == 2) setSearchParams({});
    else setSearchParams({ page: parseInt(currentPage) - 1 });
  };

  useEffect(() => {
    const fetchData = async () => {
      const jobs = [];
      let currentJobs = [];
      try {
        const queryData = query(
          jobsRef,
          where("approved", "==", true),
          orderBy("createdAt", "desc")
        );
        const documentSnapshots = await getDocs(queryData);
        documentSnapshots.forEach((doc) => {
          jobs.push({ ...doc.data(), id: doc.id });
        });
        setAllJobs(jobs);
        if (currentPage != 1) {
          currentJobs = jobs.slice(
            pageSize * (parseInt(currentPage) - 1),
            pageSize + pageSize * (parseInt(currentPage) - 1)
          );
        } else {
          currentJobs = jobs.slice(0, pageSize);
        }
        setCurrentJobs(currentJobs);
        setTotalPage(Math.ceil(jobs.length / pageSize));
      } catch (error) {
        console.error("An Error Occured: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="py-5 px-4">
      <Wrapper>
        <div className="mb-10">
          <h1 className="text-center font-extrabold text-3xl mb-4 md:text-5xl">
            All developer jobs
          </h1>
          <p className="text-center text-gray-400">Find your dream job.</p>
        </div>
        <div className="relative md:flex md:items-start md:gap-5">
          <FilterJobWidget jobs={allJobs} />
          <div className="md:grow">
            {pageSize != 0 ? (
              currentJobs.map((job) => (
                <Link key={job.id} to={`/jobs/${job.jobTitle}/${job.id}`}>
                  <JobCardWidget
                    image={job.companyLogo}
                    company={job.company}
                    position={job.jobTitle}
                    salary={job.salary}
                    location={job.location}
                    jobType={job.jobType}
                    officeLocation={job.officeLocation}
                  />
                </Link>
              ))
            ) : (
              <h2 className="text-2xl">No jobs available yet...</h2>
            )}
            <div className="flex justify-between">
              {currentPage > 1 && (
                <Button type="button" onClick={previousPage}>
                  Previous page
                </Button>
              )}
              {currentPage != totalPage && (
                <Button type="button" onClick={nextPage}>
                  Next page
                </Button>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
