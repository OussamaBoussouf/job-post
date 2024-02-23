import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import JobPost from "./pages/job-post/JobPost";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import Submited from "./pages/job-submission/Submited";
import { useAuth } from "./contexts/authContext";
import JobDetails from "./pages/job-details/JobDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const RequiredAuth = ({ children }) => {
    return user ? children : <Login />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/new" element={<JobPost />} />
        <Route path="/login" element={<Login/>}/>
        <Route
          path="/admin"
          element={
            <RequiredAuth>
              <Admin />
            </RequiredAuth>
          }
        />
        <Route path="/job-submitted" element={<Submited />} />
        <Route path="/jobs/:title/:id" element={<JobDetails />}/>
        <Route path="/admin/jobs/:title/:id" element={<JobDetails />}/>
      </Routes>
    </>
  );
}

export default App;
