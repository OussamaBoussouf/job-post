import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import JobPost from "./pages/job-post/JobPost";
import { useState } from "react";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";

function App() {
  const [authUser, setAuthUser] = useState(null);

  const RequiredAuth = ({ children }) => {
    return authUser ? children : <Login />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/new" element={<JobPost />} />
        <Route
          path="/admin"
          element={
            <RequiredAuth>
              <Admin />
            </RequiredAuth>
          }
        />
      </Routes>
    </>
  );
}

export default App;
