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
} from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

const jobsRef = collection(db, "jobs");

function MainContent() {
  let navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const [searchParams] = useSearchParams();
  const [firstJob, setFirstJob] = useState([]);
  const [lastJob, setLastJob] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const jobs = [];
      try {
        const first = query(jobsRef, orderBy("timeStamp"), limit(4));
        const snapshot = await getCountFromServer(jobsRef);
        const documentSnapshots = await getDocs(first);
        documentSnapshots.forEach((doc) => {
          jobs.push({ ...doc.data(), id: doc.id });
        });
        const lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1];
        const firstVisible = documentSnapshots.docs[0];
        setTotalPage(Math.ceil(snapshot.data().count / 4));
        setAllJobs(jobs);
        setFirstJob([firstVisible]);
        setLastJob(lastVisible);
      } catch (error) {
        console.error("An Error Occured: ", error);
      }
    };

    fetchData();
  }, []);

  const getNextJobs = async () => {
    const jobs = [];
    try {
      const next = query(
        jobsRef,
        orderBy("timeStamp"),
        startAfter(lastJob),
        limit(4)
      );
      const documentSnapshots = await getDocs(next);
      documentSnapshots.forEach((doc) => {
        jobs.push({ ...doc.data(), id: doc.id });
      });
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      const firstVisible = documentSnapshots.docs[0];
      setAllJobs(jobs);
      setLastJob(lastVisible);
      setFirstJob([...firstJob, firstVisible]);
      setCurrentPage(currentPage + 1);
      console.log("Next Job");
    } catch (error) {
      console.error("Error occured: ", error);
    }
  };
  

  console.log("RENDER COMPONENT");

  const getPreviousJobs = async () => {
    setFirstJob((prev) => {
      prev.pop();
      return prev
    });
    const jobs = [];
    try {
        const previous = query(
        jobsRef,
        orderBy("timeStamp"),
        startAt(firstJob[firstJob.length - 1]),
        limit(4)
      );
      const documentSnapshots = await getDocs(previous);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      documentSnapshots.forEach((doc) => {
        jobs.push({ ...doc.data(), id: doc.id });
      });
      setAllJobs(jobs);
      setLastJob(lastVisible);
      setCurrentPage(currentPage - 1);
    } catch (error) {
        console.error("Error occured: ", error);
      }
    };

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
          <FilterJobWidget />
          <div className="md:grow">
            {allJobs.map((job) => (
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
            ))}
            <PaginationWidget
              onNext={getNextJobs}
              onPrevious={getPreviousJobs}
              totalPages={totalPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
