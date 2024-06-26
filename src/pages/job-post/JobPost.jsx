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
  import { Input } from "@/components/ui/input";
  import { useForm } from "react-hook-form";
  import { RxCross2 } from "react-icons/rx";
  import Tiptap from "./components/Tiptap";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useState } from "react";
  import { storage } from "@/firebaseStore";
  import { useNavigate } from "react-router-dom";
  
  import { db } from "@/firebaseStore";
  import { addDoc, collection, serverTimestamp } from "firebase/firestore";
  import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
  import LocationInput from "./components/LocationInput";
import LoadingButton from "@/components/LoadingButton";
  
  const formSchema = z
    .object({
      jobTitle: z.string().min(1),
      jobType: z.string(),
      company: z.string().min(1),
      companyLogo: z
        .instanceof(File, "Required")
        .refine((val) => val.type.startsWith("image/"), {
          message: "This field accept only image",
        })
        .refine((val) => val.size < 1024 * 1024, {
          message: "Image must be less than 1MB",
        }),
      location: z.string(),
      officeLocation: z.string().optional().default("Worldwide"),
      email: z.string().email().optional().or(z.literal("")),
      website: z.string().url().optional().or(z.literal("")),
      salary: z
        .string()
        .regex(/^\d+$/, "Must be a number")
        .max(9, "Number can't be longer than 9 digits"),
      approved: z.boolean().default(false),
    })
    .superRefine((val, ctx) => {
      if (
        (val.location == "On-site" || val.location == "Hybrid") &&
        !val.officeLocation
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Location is required for on-site job",
          path: ["officeLocation"],
        });
      }
      if (!val.email && !val.website) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email or url is required",
          path: ["email"],
        });
      }
    });
  
  let textDesc = ``;
  
  function JobPost() {
    let imageUrl = "";
    const imageName = new Date().getTime();
    const navigate = useNavigate();
    const form = useForm({
      resolver: zodResolver(formSchema),
    });
  
    const { watch, setValue} = form;
  
    const [file, setFile] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const onChange = (text) => {
      textDesc = text;
    };
    
    const onSubmit = async (data) => {
        setIsLoading(true);
        const jobRef = collection(db, "jobs");
        const storageRef = ref(storage, "companies-logo/" + imageName);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error("An Error Occured before download: ", error);
            setIsLoading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                imageUrl = downloadURL;
              })
              .then(() => {
                const docRef = addDoc(jobRef, {
                  ...data,
                  website: data.website ? data.website : "",
                  email: data.email ? data.email : "",
                  imageRef: imageName,
                  description: textDesc,
                  companyLogo: imageUrl,
                  createdAt: serverTimestamp(),
                });
                textDesc = ``;
                imageUrl = "";
                navigate("/job-submitted");
              })
              .catch((error) => {
                console.error("An Error occured after download: ", error);
                setIsLoading(false);
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
                      <Input placeholder="e.g.Frontend Developer"  onChange={field.onChange}/>
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
                      <Input onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <FormField
                control={form.control}
                name="companyLogo"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Company logo</FormLabel>
                    <FormControl
                      onChange={(e) => {
                        const file = e.target.files[0];
                        fieldValues.onChange(file);
                        setFile(file);
                      }}
                    >
                      <Input {...fieldValues} accept="image/*" type="file" />
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
              {/* ALL COUNTRIES */}
              <FormField
                control={form.control}
                name="officeLocation"
                render={({ field }) => (
                  <FormItem className="mb-3 relative">
                    <FormLabel>Office location</FormLabel>
                    <FormControl>
                      <LocationInput
                        field={field}
                        onSelectLocation={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                    {watch("officeLocation") && (
                      <div className="flex">
                        <button type="button">
                          <RxCross2
                            className="text-2xl"
                            onClick={() => setValue("officeLocation", undefined)}
                          />
                        </button>
                        <span className="mx-2">{watch("officeLocation")}</span>
                      </div>
                    )}
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
                          <Input
                            defaultValue={undefined}
                            placeholder="Email"
                            onChange={field.onChange}
                          />
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
                          <Input placeholder="Website" onChange={field.onChange} />
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
                      <Input type="number" onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <LoadingButton isLoading={isLoading}>
                Submit
              </LoadingButton>
            </form>
          </Form>
        </div>
      </main>
    );
  }
  
  export default JobPost;
  