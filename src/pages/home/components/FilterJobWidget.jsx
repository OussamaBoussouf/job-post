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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function FilterJobWidget() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="bg-white border-[1px] mb-4 p-3 sticky top-0 rounded-md md:basis-1/4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="mb-3">
              <FormLabel>Search</FormLabel>
              <FormControl>
                <Input placeholder="Title, company, etc." {...field} />
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
              <Select defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
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
          name="type"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Location</FormLabel>
              <Select defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remote-jobs"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 mb-3 space-y-0">
              <FormControl>
                <Checkbox />
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
