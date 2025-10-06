import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import useNotificationWebSocket from "../hooks/useNotificationWebSocket";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import axiosInstance from "../service/axiosInstance"; // adjust path if needed

function AppLayout() {
  const { user } = useAuth();
  console.log(user.email);
  const [notificationCount, setNotificationCount] = useState(0);

  // Load initial notifications
  useEffect(() => {
    const getMyNotifications = async () => {
      try {
        const response = await axiosInstance.get("/api/notifications");
        const unseenCount = response.length;
        setNotificationCount(unseenCount);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    if (user) {
      getMyNotifications();
    }
  }, [user]);

  // Handle real-time notifications
  useNotificationWebSocket(user?.email, (notificationJson) => {
    try {
      const notification = notificationJson;
      toast.success(`🔔 ${notification.message}`, { duration: 5000 });
      setNotificationCount((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to parse notification:", error);
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar notificationCount={notificationCount} />
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
