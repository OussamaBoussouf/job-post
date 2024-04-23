

export const filterJob = (jobs, searchParams) => {
  const pageSize = 4;
  let totalPage = 0;
  let filteredJobs = jobs;

  if (searchParams.has("search")) {
    filteredJobs = filteredJobs.filter(
      (filteredJob) =>
        filteredJob.company
          .toLowerCase()
          .includes(searchParams.get("search").toLowerCase()) ||
        filteredJob.jobTitle
          .toLowerCase()
          .includes(searchParams.get("search").toLowerCase())
    );
  }

  if (searchParams.has("type")) {
    filteredJobs = filteredJobs.filter(
      (filteredJobs) => filteredJobs.jobType.toLowerCase() == searchParams.get("type").toLowerCase()
    );
  }

  if (searchParams.has("location")) {
    filteredJobs = filteredJobs.filter(
      (filteredJob) =>
        filteredJob.officeLocation == searchParams.get("location")
    );
  }

  if (searchParams.has("remote")) {
    filteredJobs = filteredJobs.filter(
      (filteredJob) => filteredJob.officeLocation == "Worldwide"
    );
  }

  // Total page of the filtered jobs
  totalPage = Math.ceil(filteredJobs.length / pageSize);


  //Divide 
  filteredJobs = filteredJobs.slice(
    pageSize * parseInt(searchParams.get("page") || 1) - pageSize,
    pageSize * parseInt(searchParams.get("page") || 1)
  );


  return { filteredJobs, totalPage };
};


export function urlFormat(url) {
    const newUrl = url.replace(/\/|\s+/g, "-");
    return newUrl;
 }
 
 export function salaryFormat(salary) {
    return parseInt(salary).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
  
  export function dateFormat(dateOfCreation) {
    const currentDate = parseInt(new Date().getTime() / 1000); //By seconds
    const timeDifference = currentDate - dateOfCreation;
    if (timeDifference < 60) {
      return (`${timeDifference} second ago`);
    } else if (timeDifference < 3600) {
      const result = parseInt(timeDifference / 60);
      return (`${result} minute(s) ago`);
    } else if (timeDifference < 86400) {
      const result = parseInt(timeDifference / 3600);
      return (`${result} hour(s) ago`);
    } else {
      const result = parseInt(timeDifference / 86400);
      return (`${result} day(s) ago`);
    }
  }