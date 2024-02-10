import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

function Login() {
  const form = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const password = useRef(null);

  const handleClick = () => {
    if(!showPassword){
        password.current.type = "text";
        setShowPassword(!showPassword);
    }
    else{
        password.current.type = "password";
        setShowPassword(!showPassword);
    }
  }

  return (
    <div className="grid place-items-center h-screen">
    <div className="w-11/12 max-w-[400px] p-10 rounded-2xl shadow-2xl">
      <h3 className="text-2xl font-bold mb-5">Sign in</h3>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="Email"
            render={() => (
              <FormItem className="mb-3">
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Password"
            render={() => (
              <FormItem className="mb-3">
                <FormLabel>Password</FormLabel>
                <div className="relative">
                <FormControl>
                  <Input ref={password} type="password"/>
                </FormControl>
                    {showPassword ? 
                        <FaEyeSlash onClick={() => handleClick()} className="absolute right-4 -translate-y-1/2 top-1/2 hover:cursor-pointer"/>
                        :
                        <FaEye onClick={() => handleClick()} className="absolute right-4 -translate-y-1/2 top-1/2 hover:cursor-pointer"/>
                    }
                </div>
              </FormItem>
            )}
          />
          <Button className="w-full mt-3 text-lg">Login</Button>
        </form>
      </Form>
    </div>
    </div>
  );
}

export default Login;
