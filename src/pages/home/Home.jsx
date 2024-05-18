import FilterJobWidget from "@/pages/home/components/FilterJobWidget";
import Wrapper from "@/components/Wrapper";
import PaginationWidget from "./components/PaginationWidget";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobList from "./components/JobList";

import CardSkeleton from "@/components/CardSkeleton";
import { filterJob } from "@/utils/utils";


function Home({ jobs, isLoading }) {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const navigate = useNavigate();

  const { filteredJobs, totalPage } = useMemo(() => {
    return filterJob(jobs, searchParams);
  }, [jobs, searchParams]);

  const paginate = (type) => {
    const pageNumber = type == "next" ? currentPage + 1 : currentPage - 1;
    const q = {
      search: searchParams.get("search"),
      type: searchParams.get("type"),
      location: searchParams.get("location"),
      remote: searchParams.get("remote"),
      page: pageNumber == 1 ? null : pageNumber,
    };
    setCurrentPage(pageNumber);
    updateUrl(q);
  };

  const nextPage = () => {
    paginate("next");
  };

  const previousPage = () => {
    paginate("previous");
  };

  const updateUrl = (data) => {
    const query = {};
    for (let key in data) {
      if (data[key]) {
        query[key] = data[key];
      }
    }

    const searchParams = new URLSearchParams(query);
    navigate(`/?${searchParams.toString()}`);
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
          <FilterJobWidget handleFilter={updateUrl} />
          <div className="md:grow">
            {isLoading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <JobList displayedJobs={filteredJobs} />
            )}
            {filteredJobs.length != 0 && (
              <PaginationWidget
                onNext={() => nextPage("next")}
                onPrevious={() => previousPage("previous")}
                currentPage={currentPage}
                totalPages={totalPage}
              />
            )}
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default Home;
