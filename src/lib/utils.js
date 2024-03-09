import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
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


