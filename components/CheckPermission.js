"use client"
import { useEffect, useState } from "react";
import { me_permission,get_me } from "@/services/api/me";

function CheckPermission({ permission, children }) {
  const [currentPermissions, setCurrentPermissions] = useState([]);
const [currentUser, setcurrentUser] = useState()

  const getCurrentUser = async() =>{
    const response =await get_me()
    setcurrentUser(response.username);
  }
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await me_permission();
        setCurrentPermissions([...response]); 
        
      } catch (error) {
        console.error("Error fetching permissions:", error);
      }
    };

    fetchPermissions();
    getCurrentUser()
  }, []);
if (currentUser === "admin") {
  return <>{children}</>;
}
  if (currentPermissions.some((item) => item.name === permission)) {
    return <>{children}</>;
  }

  return null;
}

export default CheckPermission;
