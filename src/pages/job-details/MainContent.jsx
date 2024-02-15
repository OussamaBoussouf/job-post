import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { LuBriefcase } from "react-icons/lu";
import { IoEarthOutline, IoLocationOutline } from "react-icons/io5";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import {db} from "@/firebaseStore";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";


function MainContent() {
  const {id} = useParams();
  const [job, setJob] = useState({});

  useEffect(()=> {
    const fetchData = async () => {
      const docRef = doc(db, "jobs", id);
      const docSnap = await getDoc(docRef);
      setJob(docSnap.data());
    }

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
              <h2 className="font-bold text-xl">
                {job.jobTitle}
              </h2>
              <p className="font-semibold text-green-500 mb-3">{job.company}</p>
              <ul className="text-gray-500">
                <li className="flex items-center">
                  <LuBriefcase className="me-1 text-lg" />
                  <span>{job.jobType}</span>
                </li>
                <li className="flex items-center">
                  <IoLocationOutline className="me-1 text-lg" />{job.location}
                </li>
                <li className="flex items-center">
                  <IoEarthOutline className="me-1 text-lg" /> {job.officeLocation}
                </li>
                <li className="flex items-center">
                  <PiCurrencyCircleDollar className="me-1 text-lg" /> $
                  {job.salary}
                </li>
              </ul>
            </div>
          </div>
          <Button className="" type="button">Apply now</Button>
        </div>
        <div dangerouslySetInnerHTML={{__html: job.description}} className="mt-10">
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
