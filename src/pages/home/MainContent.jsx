import FilterJobWidget from "@/pages/home/components/FilterJobWidget";
import Wrapper from "@/components/Wrapper";
import JobCardWidget from "./components/JobCardWidget";
import PaginationWidget from "./components/PaginationWidget";
import { db, storage } from "@/firebaseStore";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { Link } from "react-router-dom";

function MainContent() {
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobs = [];
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        querySnapshot.forEach((doc) => {
          jobs.push({...doc.data(), id: doc.id});
        });
        setAllJobs(jobs);
      } catch (error) {
        console.error("An Error Occured: ", error);
      }
    };

    fetchData();
  }, []);

  console.log(allJobs);


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
                image = {job.companyLogo}
                company={job.company}
                position={job.jobTitle}
                salary={job.salary}
                location={job.location}
                jobType={job.jobType}
                officeLocation={job.officeLocation}
              />
              </Link>
            ))}
            <PaginationWidget />
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
