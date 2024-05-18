import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

function withAuth(WrappedComponent) {
  return (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    }, []);

    if (user) {
      return <WrappedComponent {...props} />;
    }
  };
}

export default withAuth;
