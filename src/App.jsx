import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import JobPost from "./pages/job-post/JobPost";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import Submited from "./pages/job-submission/Submited";
import JobDetails from "./pages/job-details/JobDetails";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebaseStore";
import PageStructure from "./pages/layouts/PageStructure";
import NotFound from "./pages/not-found/NotFound";


function App() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const jobsRef = collection(db, "jobs");

  useEffect(() => {
    const q = query(
      jobsRef,
      where("approved", "==", true),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const jobs = [];
        querySnapshot.forEach((doc) => {
          jobs.push({ ...doc.data(), id: doc.id });
        });
        setJobs(jobs);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route element={<PageStructure />}>
          <Route path="/" element={<Home jobs={jobs} isLoading={isLoading} />} />
          <Route path="/jobs/new" element={<JobPost />} />
          <Route path="/job-submitted" element={<Submited />} />
          <Route path="/jobs/:title/:id" element={<JobDetails />} />
          <Route path="/admin/jobs/:title/:id" element={<JobDetails />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default App;
