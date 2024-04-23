import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../../../components/ui/checkbox";
import { jobTypes } from "@/lib/job-types";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebaseStore";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const formSchema = z.object({
  search: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.boolean().default(false),
});

const docRef = collection(db, "jobs");

function FilterJobWidget({ handleFilter }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [location, setLocation] = useState([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const q = query(
      docRef,
      where("approved", "==", true),
      where("officeLocation", "!=", "Worldwide")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const locationList = [];
      querySnapshot.forEach((doc) => {
        locationList.push(doc.data().officeLocation);
      });
      setLocation(locationList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    handleFilter({ ...data, search: data.search?.trim() });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white border-[1px] mb-4 p-3 sticky z-10 top-0 rounded-md md:basis-1/4"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input
                  defaultValue={searchParams.get("search") || null}
                  placeholder="Title, company, etc."
                  onChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Type</FormLabel>
              <Select
                defaultValue={searchParams.get("type") || field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={null}>All types</SelectItem>
                  {jobTypes?.map((jobType) => (
                    <SelectItem key={jobType} value={jobType}>
                      {jobType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Location</FormLabel>
              <Select
                defaultValue={searchParams.get("location") || field.value}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={null}>All location</SelectItem>
                  {location?.map((locationType) => (
                    <SelectItem key={locationType} value={locationType}>
                      {locationType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remote"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 mb-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="m-0">Remote jobs</FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Filter jobs
        </Button>
      </form>
    </Form>
  );
}

export default FilterJobWidget;
