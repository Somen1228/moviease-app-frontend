import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../calls/users";

function ProtectedRoute({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    
    const callForUserDetails = async () => {
      const response = await getUserDetails();
      if(response.success){
        setUser(response.data);
      } else {
        navigate("/");
      }
    }

    useEffect(() => {
        const isTokenAvailable = localStorage.getItem("token");
        if(!isTokenAvailable) { //is token Avialable
            navigate("/")   
        } 
        callForUserDetails();
    }, [])

    console.log(user);
    
    if (user) {
      return (
          <>
              {React.Children.map(children, child => {
                  if (React.isValidElement(child)) {
                      return React.cloneElement(child, { userDetails: user });
                  }
                  return child;
              })}
          </>
      );
  }

  return null; // or a loading spinner, or some other fallback UI
}

export default ProtectedRoute