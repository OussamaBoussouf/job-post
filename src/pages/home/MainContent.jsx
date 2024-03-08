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

function MainContent({ jobs }) {
  // const [allJobs, setAllJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const pageSize = 4;

  const nextPage = () => {
    const q = {};
    const newItems = filteredJobs.slice(
      pageSize * parseInt(currentPage),
      currentJobs.length * (parseInt(currentPage) + 1)
    );
    if (searchParams.size) {
      for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        q[param] = value;
      }
    }
    setCurrentJobs(newItems);
    setSearchParams({ ...q, page: parseInt(currentPage) + 1 });
    setCurrentPage(parseInt(currentPage) + 1);
  };

  const previousPage = () => {
    const q = {};
    const newItems = filteredJobs.slice(
      pageSize * (parseInt(currentPage) - 1) - pageSize,
      pageSize * (parseInt(currentPage) - 1)
    );
    if (searchParams.size) {
      for (const entry of searchParams.entries()) {
        const [param, value] = entry;
        if (param != "page") {
          q[param] = value;
        }
      }
    }
    setCurrentJobs(newItems);
    setCurrentPage(parseInt(currentPage) - 1);
    if (searchParams.get("page") == 2) setSearchParams(q);
    else setSearchParams({ ...q, page: parseInt(currentPage) - 1 });
  };

  const handleFilter = (data) => {
    let newFilteredJobs = jobs;
    const query = {};
    for (let key in data) {
      if (data[key]) {
        query[key] = data[key];
      }
    }

    const searchParams = new URLSearchParams(query);
    navigate(`/?${searchParams.toString()}`);

    if (
      !searchParams.has("search") &&
      !searchParams.has("type") &&
      !searchParams.has("location") &&
      !searchParams.has("remote") &&
      !searchParams.has("page")
    ) {
      setFilteredJobs(newFilteredJobs);
      setCurrentJobs(newFilteredJobs.slice(0, pageSize));
      setTotalPage(Math.ceil(newFilteredJobs.length / pageSize));
      setCurrentPage(1);
      return;
    }

    if (searchParams.has("search")) {
      newFilteredJobs = newFilteredJobs.filter((filteredJob) =>
        filteredJob.company.toLowerCase().includes(query.search.toLowerCase())
      );
    }
    if (searchParams.has("type")) {
      newFilteredJobs = newFilteredJobs.filter(
        (filteredJob) => filteredJob.jobType == query.type
      );
    }
    if (searchParams.has("location")) {
      newFilteredJobs = newFilteredJobs.filter(
        (filteredJob) => filteredJob.officeLocation == query.location
      );
    }
    if (searchParams.has("remote")) {
      newFilteredJobs = newFilteredJobs.filter(
        (filteredJob) => filteredJob.officeLocation == "Worldwide"
      );
    }

    if (searchParams.get("page")) {
      setCurrentJobs(
        newFilteredJobs.slice(
          pageSize * (parseInt(currentPage) - 1),
          pageSize + pageSize * (parseInt(currentPage) - 1)
        )
      );
    }

    if (!searchParams.get("page")) {
      setCurrentJobs(newFilteredJobs.slice(0, pageSize));
      setCurrentPage(1);
    }
    setFilteredJobs(newFilteredJobs);
    setTotalPage(Math.ceil(newFilteredJobs.length / pageSize));
    console.log(currentPage);
  };

  useEffect(() => {
    if (jobs) {
      const searchQuery = {
        search: searchParams.get("search"),
        type: searchParams.get("type"),
        location: searchParams.get("location"),
        remote: searchParams.get("remote"),
        page: searchParams.get("page"),
      };

      handleFilter(searchQuery);
    }
    // const searchQuery = {
    //   search: searchParams.get("search"),
    //   type: searchParams.get("type"),
    //   location: searchParams.get("location"),
    //   remote: searchParams.get("remote"),
    //   page: searchParams.get("page"),
    // };

    // if (!searchParams.size) {
    //   const fetchData = async () => {
    //     const jobs = [];
    //     let currentJobs;
    //     try {
    //       const queryData = query(
    //         jobsRef,
    //         where("approved", "==", true),
    //         orderBy("createdAt", "desc")
    //       );
    //       const documentSnapshots = await getDocs(queryData);
    //       documentSnapshots.forEach((doc) => {
    //         jobs.push({ ...doc.data(), id: doc.id });
    //       });
    //       setAllJobs(jobs);
    //       setFilteredJobs(jobs);
    //       if (currentPage != 1) {
    //         currentJobs = jobs.slice(
    //           pageSize * (parseInt(currentPage) - 1),
    //           pageSize + pageSize * (parseInt(currentPage) - 1)
    //         );
    //       } else {
    //         currentJobs = jobs.slice(0, pageSize);
    //       }
    //       setCurrentJobs(currentJobs);
    //       setTotalPage(Math.ceil(jobs.length / pageSize));
    //     } catch (error) {
    //       console.error("An Error Occured: ", error);
    //     }
    //   };

    //   fetchData();
    // }
    // else {
    //   const fetchData = async () => {
    //     const jobs = [];
    //     try {
    //       const queryData = query(
    //         jobsRef,
    //         where("approved", "==", true),
    //         orderBy("createdAt", "desc")
    //       );
    //       const documentSnapshots = await getDocs(queryData);
    //       documentSnapshots.forEach((doc) => {
    //         jobs.push({ ...doc.data(), id: doc.id });
    //       });
    //       console.log(searchQuery);
    //       setAllJobs(jobs);
    //       handleFilter(searchQuery, jobs);
    //     } catch (error) {
    //       console.error("An Error Occured: ", error);
    //     }
    //   };

    //   fetchData();
    // }
  }, [jobs]);

  useEffect(() => {
    if (searchParams.size == 0) {
      handleFilter();
    }
  }, [searchParams]);

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
          <FilterJobWidget jobs={filteredJobs} handleFilter={handleFilter} />
          <div className="md:grow">
            {currentJobs != 0 ? (
              currentJobs.map((job) => (
                <Link key={job.id} to={`/jobs/${job.jobTitle}/${job.id}`}>
                  <JobCardWidget {...job} />
                </Link>
              ))
            ) : (
              <h2 className="text-2xl">No jobs available.</h2>
            )}
            {currentJobs.length != 0 && (
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
            )}
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
