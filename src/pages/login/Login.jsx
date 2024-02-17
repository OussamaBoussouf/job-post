import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/firebaseStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/contexts/authContext";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8, {
    message: "The password should be at least 8 characters",
  }),
});

function Login() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const user = useAuth();
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const password = useRef();



  const handleClick = () => {
    if (!showPassword) {
      password.current.type = "text";
      setShowPassword(!showPassword);
    } else {
      password.current.type = "password";
      setShowPassword(!showPassword);
    }
  };

  const onSubmit = (data) => {
    setIsDisabled(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate(0);
      })
      .catch((error) => {
        console.error(error.code);
        setIsDisabled(false);
        setError(true);
      });
  };

  console.log("Login:", user);

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-11/12 max-w-[400px] p-10 rounded-2xl shadow-2xl">
        <h3 className="text-2xl font-bold mb-5">Sign in</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl ref={password} className="relative">
                      <Input type="password" {...field} />
                    </FormControl>
                    {showPassword ? (
                      <FaEyeSlash
                        onClick={() => handleClick()}
                        className="absolute right-4 -translate-y-1/2 top-1/2 hover:cursor-pointer"
                      />
                    ) : (
                      <FaEye
                        onClick={() => handleClick()}
                        className="absolute right-4 -translate-y-1/2 top-1/2 hover:cursor-pointer"
                      />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-red-600 font-semibold text-sm">
                Your password is incorrect or this account doesn’t exist.
              </p>
            )}
            <Button disabled={isDisabled} className="w-full mt-3 text-lg">
              {isDisabled ? 
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
              : 
                "Login"
              }
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
