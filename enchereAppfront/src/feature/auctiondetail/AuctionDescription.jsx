import React from "react";
import { HiCalendar, HiCurrencyDollar } from "react-icons/hi2";
import Badge from "../../components/Badge";

export default function AuctionDescription({ auction }) {
  console.log(auction);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold md:text-3xl">{auction.title}</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="outline" className="flex items-center">
          <HiCurrencyDollar />
          <span>Starting: {auction.startPrice}</span>
        </Badge>
        <Badge variant="outline" className="flex items-center">
          <HiCalendar />
          <span>Ends: {formatDate(auction.endTime)}</span>
        </Badge>
        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 p-2">
          {auction.category?.name}
        </Badge>

        <Badge variant="outline">
          <span>Condition: {auction.condition?.name}</span>
        </Badge>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Description</h2>
        <p className="mt-2 text-muted-foreground">{auction.description}</p>
      </div>
    </div>
  );
}
