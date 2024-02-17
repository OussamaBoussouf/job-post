import Wrapper from "@/components/Wrapper";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/authContext";
import {auth} from "@/firebaseStore";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

function MainContent() {
  const user = useAuth();
  const navigate  = useNavigate();

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(user);

  return (
    <main>
      <Wrapper>
        <div className="flex justify-between">
          <p className="font-semibold">Admin Dashboard</p>
          <div>
            <span className="me-3 font-semibold">{user.email}</span>
            <Button type="button" className="underline bg-transparent p-0 text-black hover:bg-transparent" onClick={onLogout}>
              Log out
            </Button>
          </div>
        </div>
      </Wrapper>
    </main>
  );
}

export default MainContent;
