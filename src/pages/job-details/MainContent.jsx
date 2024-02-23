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

function MainContent() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [isApproved, setIsApproved] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const containAdmin = location.pathname.includes("admin");

  const onApprove = async (jobId) => {
    setIsApproved(true);
    try {
      await updateDoc(doc(db, "jobs", jobId), {
        approved: true,
      });
      navigate('/admin');
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
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);
        setJob(docSnap.data());
      } catch (error) {
        console.error("An error occured: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="py-10 px-5">
      <Wrapper>
        <div className="xsm:flex xsm:justify-between">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={job.companyLogo}
              alt="apple logo"
              width="100"
              height="100"
              className="rounded-xl object-cover"
            />
            <div>
              <h2 className="font-bold text-xl">{job.jobTitle}</h2>
              <p className="font-semibold text-green-500 mb-3">{job.company}</p>
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
                  <IoEarthOutline className="me-1 text-lg" />{" "}
                  {job.officeLocation}
                </li>
                <li className="flex items-center">
                  <PiCurrencyCircleDollar className="me-1 text-lg" /> $
                  {job.salary}
                </li>
              </ul>
            </div>
          </div>
          {containAdmin ? (
            <div className="w-40">
              <Button
                onClick={() => onApprove(id)}
                className="bg-green-500 hover:bg-green-600 w-full mb-2"
                disabled={isApproved}
              >
                {isApproved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="me-1"
                  >
                    <path
                      fill="white"
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    >
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      />
                    </path>
                  </svg>
                ) : (
                  ""
                )}
                Approve
              </Button>
              <Button
                onClick={() => onDelete(id, job.imageRef)}
                className="bg-red-500 hover:bg-red-600 w-full"
                disabled={isDeleted}
              >
                {isDeleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="me-1"
                  >
                    <path
                      fill="white"
                      d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    >
                      <animateTransform
                        attributeName="transform"
                        dur="0.75s"
                        repeatCount="indefinite"
                        type="rotate"
                        values="0 12 12;360 12 12"
                      />
                    </path>
                  </svg>
                ) : (
                  ""
                )}
                Delete
              </Button>
            </div>
          ) : (
            <Button type="button">Apply now</Button>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: job.description }}
          className="mt-10"
        ></div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
