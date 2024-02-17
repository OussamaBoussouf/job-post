import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Tiptap from "./Tiptap";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { storage } from "@/firebaseStore";
import { useNavigate } from "react-router-dom";

import { db } from "@/firebaseStore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const formSchema = z.object({
  jobTitle: z.string(),
  jobType: z.string(),
  company: z.string(),
  companyLogo: z.string(),
  location: z.string(),
  officeLocation: z.string(),
  email: z.string().email(),
  website: z.string().url(),
  salary: z.string(),
});

let textDesc = ``;

function JobForm() {
  let imageUrl = "";
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [file, setFile] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const onChange = (text) => {
    textDesc = text;
  };

  const onSubmit = async (data) => {
    setIsDisabled(true);
    const jobRef = collection(db, "jobs");
    const storageRef = ref(storage, "companies-logo/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("An Error Occured: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            imageUrl = downloadURL;
          })
          .then(() => {
            const docRef = addDoc(jobRef, {
              ...data,
              description: textDesc,
              companyLogo: imageUrl,
              approved: false,
              timeStamp: serverTimestamp(),
            });
            textDesc = ``;
            navigate("/job-submitted");
          })
          .catch((error) => {
            setIsDisabled(false);
            console.error("An Error occured: ", error);
          });
      }
    );
  };

  return (
    <main className="py-10 px-5">
      <div className="mb-10">
        <h1 className="text-center font-extrabold text-3xl mb-4 md:text-5xl">
          Find your perfect developer
        </h1>
        <p className="text-center text-gray-400">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="mx-auto max-w-[900px] bg-white border-[1px] mb-4 p-3 sticky top-0 rounded-md ">
        <Form {...form}>
          <span className="font-bold">Job details</span>
          <p className="text-gray-400 mb-9">
            Provide a job description and details
          </p>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g.Frontend Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Job type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Volunteer">Volunteer</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Company logo</FormLabel>
                  <FormControl onChange={(e) => setFile(e.target.files[0])}>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="officeLocation"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <Input
                      type="search"
                      placeholder="Search for a city..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel className="mb-1">How to apply</FormLabel>
            <div className="flex mb-3 mt-1">
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex-grow">
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <p className="mx-2 mt-2">or</p>
              <div className="flex-grow">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex-grow">
                        <Input placeholder="Website" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap handleChange={onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isDisabled} type="submit">
              {isDisabled ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
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
              <span className="ms-2">Submit</span>
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default JobForm;
