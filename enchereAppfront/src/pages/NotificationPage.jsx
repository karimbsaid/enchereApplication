import React, { useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";
import NotificationCard from "../components/NotificationCard";
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getMyNotification = async () => {
      const response = await axiosInstance.get("/api/notifications");
      setNotifications(response);
    };
    getMyNotification();
  }, []);
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4">
        <div>
          <Link
            href="/"
            className="mb-2 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <HiChevronLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your auction activity.
          </p>
        </div>
        {notifications.length == 0 && (
          <span className="text-center mt-5">
            You have no unread notifications.
          </span>
        )}
        {notifications.map((not) => (
          <NotificationCard key={not.id} notification={not} />
        ))}
      </div>
    </div>
  );
}
