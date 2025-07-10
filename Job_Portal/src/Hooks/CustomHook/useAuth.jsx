import { useContext } from "react";
import AuthContext from "../../Context/AuthContext/AuthContext";

const useAuth = ()=>{

const Context = useContext(AuthContext);
return Context;


}

export default useAuth;