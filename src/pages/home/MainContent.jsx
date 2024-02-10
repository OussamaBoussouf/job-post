import FilterJobWidget from "@/pages/home/components/FilterJobWidget";
import Wrapper from "@/components/Wrapper";
import JobCardWidget from "./components/JobCardWidget";
import PaginationWidget from "./components/PaginationWidget";

function MainContent() {
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
          <div className="space-y-5 md:grow">
            <JobCardWidget />
            <JobCardWidget />
            <JobCardWidget />
            <JobCardWidget />
            <JobCardWidget />
            <JobCardWidget />
            <PaginationWidget/>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
