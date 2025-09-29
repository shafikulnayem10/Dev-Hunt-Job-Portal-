import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/CustomHook/useAuth";


const PrivateRoute = ({ children}) => {
  const { user } = useAuth();  

  if (!user) return <Navigate to="/signin" />;

 

  return children;
};

export default PrivateRoute;
