"use client"
import { useEffect, useState } from "react";
import { me_permission } from "@/services/api/me";

function CheckPermission({ permission, children }) {
  const [currentPermissions, setCurrentPermissions] = useState([]);

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
  }, []);

  if (currentPermissions.some((item) => item.name === permission)) {
    return <>{children}</>;
  }

  return null;
}

export default CheckPermission;
