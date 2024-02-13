import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import JobPost from "./pages/job-post/JobPost";
import Admin from "./pages/admin/Admin";
import Login from "./pages/login/Login";
import { useAuth } from "./contexts/authContext";

function App() {
  const user = useAuth();

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
      </Routes>
    </>
  );
}

export default App;
