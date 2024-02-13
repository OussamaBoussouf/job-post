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
import { Button } from "@/components/ui/button";


import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import Tiptap from "./Tiptap";

function JobForm() {
  const form = useForm();

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
          <form>
            <FormField
              control={form.control}
              name="job-title"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g.Frontend Developer" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="job-type"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Job type</FormLabel>
                  <Select defaultValue={field.value}>
                    <FormControl className="text-gray-400">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company-logo"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Company logo</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Location</FormLabel>
                  <Select defaultValue={field.value}>
                    <FormControl className="text-gray-400">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="on-site">On-site</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="office-location"
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apply"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>How to apply</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <span className="mx-2">or</span>
                    <FormControl>
                      <Input type="url" placeholder="Website" {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap/>
                  </FormControl>
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
                    <Input type="number" {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default JobForm;
