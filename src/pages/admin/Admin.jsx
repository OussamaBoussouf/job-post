import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { auth } from "@/firebaseStore";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "@/firebaseStore";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import JobCardWidget from "@/pages/home/components/JobCardWidget";
import withAuth from "@/withAuth";
import { salaryFormat, dateFormat } from "@/utils/utils";
import { LuBriefcase } from "react-icons/lu";
import { IoEarthOutline, IoLocationOutline, IoTimeOutline } from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";

const jobsRef = collection(db, "jobs");

function Admin() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const navigate = useNavigate();
  const [unapprovedJobs, setUnapprovedJobs] = useState([]);

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const q = query(
      jobsRef,
      where("approved", "==", false),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push({ ...doc.data(), id: doc.id });
        });
        setUnapprovedJobs(jobs);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(unapprovedJobs);

  return (
    <main className="py-5 px-4">
      <Wrapper>
        <div className="flex justify-between">
          <p className="font-semibold">Admin Dashboard</p>
          <div>
            <span className="me-3 font-semibold">{user.email}</span>
            <Button
              type="button"
              className="underline bg-transparent p-0 text-black hover:bg-transparent"
              onClick={onLogout}
            >
              Log out
            </Button>
          </div>
        </div>
        <h1 className="text-center font-extrabold text-3xl mb-4 md:text-5xl">
          Admin Dashboard
        </h1>
        <div>
          <p className="font-bold mb-5">Unapproved Jobs:</p>
          <div>
            {unapprovedJobs.length != 0 ? (
              unapprovedJobs.map((job) => (
                <Link key={job.id} to={`/admin/jobs/${job.jobTitle}/${job.id}`}>
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
                          <IoLocationOutline className="me-1 text-lg" />{" "}
                          {job.location}
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
              ))
            ) : (
              <p className="text-gray-500">No unapproved jobs</p>
            )}
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default withAuth(Admin);
