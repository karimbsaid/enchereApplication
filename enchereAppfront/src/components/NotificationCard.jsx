import React from "react";
import { HiBell, HiXMark, HiCheckCircle } from "react-icons/hi2";
import Card from "./Card";
import Button from "./Button";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";

// Helpers
const getIcon = (type) => {
  switch (type) {
    case "bid":
      return <HiCheckCircle className="h-5 w-5 text-white" />;
    case "info":
      return <HiBell className="h-5 w-5 text-white" />;
    case "warning":
      return <HiXMark className="h-5 w-5 text-white" />;
    default:
      return <HiBell className="h-5 w-5 text-white" />;
  }
};

const getColor = (type) => {
  switch (type) {
    case "bid":
      return "bg-green-500";
    case "info":
      return "bg-blue-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-gray-400";
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

export default function NotificationCard({ notification }) {
  return (
    <Card className="border-l-4 border-l-primary">
      <div className="flex gap-4 p-4 md:p-6">
        <div
          className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500`}
        >
          <HiBell className="h-5 w-5 text-white" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm text-muted-foreground">
                {notification.message}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button asChild size="sm">
                <Link to={`/auctions/${notification.auctionId}`}>
                  consulter détail
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2 pt-2 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              {formatDate(notification.timestamp)}
            </p>
            {/* <Button asChild size="sm" variant="outline">
              <Link to={notification.actionUrl}>{notification.actionText}</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </Card>
  );
}
