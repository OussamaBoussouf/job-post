import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
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
import { useEffect, useRef, useState } from "react";


import { auth } from "@/firebaseStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@/components/LoadingButton";



function Login() {
  const navigate = useNavigate();
  const form = useForm();

  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/admin");
      })
      .catch((error) => {
        console.log("Error:", error);
        setIsLoading(false);
        setError(true);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, []);

  if (!user) {
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
                      <Input
                        type="email"
                        name="email"
                        onChange={field.onChange}
                      />
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
                        <Input
                          type="password"
                          name="password"
                          onChange={field.onChange}
                        />
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
                  Your password is incorrect or this account doesn't exist.
                </p>
              )}
              <LoadingButton
                isLoading={isLoading}
                btnStyle="w-full mt-3 text-lg"
              >
                Login
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
