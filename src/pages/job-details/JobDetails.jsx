import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { LuBriefcase } from "react-icons/lu";
import { IoEarthOutline, IoLocationOutline } from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { db, storage } from "@/firebaseStore";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";
import { salaryFormat } from "@/utils/utils";
import LoadingButton from "@/components/LoadingButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function JobDetails() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [job, setJob] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const containAdmin = location.pathname.includes("admin");
  console.log(job);

  const onApprove = async (jobId) => {
    setIsApproved(true);
    try {
      await updateDoc(doc(db, "jobs", jobId), {
        approved: true,
      });
      navigate("/admin");
    } catch (error) {
      setIsApproved(false);
      console.error("An error occured: ", error);
    }
  };

  const onDelete = async (jobId, fileRef) => {
    setIsDeleted(true);
    const imageRef = ref(storage, "companies-logo/" + fileRef);
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      await deleteObject(imageRef);
      console.log("DELETED SUCCESSFULLY");
      navigate("/admin");
    } catch (error) {
      setIsDeleted(false);
      console.error("An Error occured: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);
        setJob(docSnap.data());
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("An error occured: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="py-10 px-5">
      <Wrapper>
        {!isLoading ? (
          <>
            <div className="xsm:flex xsm:justify-between xsm:items-start">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  width="100"
                  height="100"
                  className="rounded-xl object-cover"
                />
                <div>
                  <h2 className="font-bold text-xl">{job.jobTitle}</h2>
                  <p className="font-semibold text-green-500 mb-3">
                    {job.company}
                  </p>
                  <ul className="text-gray-500">
                    <li className="flex items-center">
                      <LuBriefcase className="me-1 text-lg" />
                      <span>{job.jobType}</span>
                    </li>
                    <li className="flex items-center">
                      <IoLocationOutline className="me-1 text-lg" />
                      {job.location}
                    </li>
                    <li className="flex items-center">
                      <IoEarthOutline className="me-1 text-lg" />
                      {job.officeLocation}
                    </li>
                    <li className="flex items-center">
                      <PiCurrencyCircleDollar className="me-1 text-lg" />
                      {salaryFormat(job.salary)}
                    </li>
                  </ul>
                </div>
              </div>
              {containAdmin ? (
                <div className="w-40">
                  <LoadingButton
                    onClick={() => onApprove(id)}
                    btnStyle="bg-green-500 hover:bg-green-600 w-full mb-2"
                    isLoading={isApproved}
                  >
                    Approve
                  </LoadingButton>
                  <LoadingButton
                    onClick={() => onDelete(id, job.imageRef)}
                    btnStyle="bg-red-500 hover:bg-red-600 w-full"
                    isLoading={isDeleted}
                  >
                    Delete
                  </LoadingButton>
                </div>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger className="bg-black text-white py-2 px-4 text-sm font-semibold rounded-lg">
                    Apply now
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Applying for a job
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Sorry you cannot apply to this job or any other jobs right now
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: job.description }}
              className="mt-10"
            ></div>
          </>
        ) : (
          <div className="mx-auto border-[5px] rounded-full animate-spin border-b-blue-500 w-14 h-14 "></div>
        )}
      </Wrapper>
    </main>
  );
}

export default JobDetails;
