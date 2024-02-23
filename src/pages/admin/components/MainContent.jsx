import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import { auth } from "@/firebaseStore";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "@/firebaseStore";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import JobCardWidget from "@/pages/home/components/JobCardWidget";

const jobsRef = collection(db, "jobs");

function MainContent() {
  const user = useAuth();
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
    const fetchData = async () => {
      const q = query(
        jobsRef,
        where("approved", "==", false),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push({...doc.data(), id: doc.id});
      });
      setUnapprovedJobs(jobs);
    };

    fetchData();
  }, []);

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
              <p className="text-gray-500">No unapproved jobs</p>
            )}
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
