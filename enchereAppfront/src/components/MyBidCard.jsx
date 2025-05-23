import React from "react";
import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";
import { Link } from "react-router-dom";
export default function MyBidCard({ auction }) {
  return (
    <Card>
      <div className="relative">
        <Link href={`/auctions/${auction.id}`}>
          <div className="aspect-video overflow-hidden">
            <img
              src={auction.images[0] || "/placeholder.svg"}
              alt={auction.title}
              width={400}
              height={225}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        </Link>

        {/* Status Badge */}
        <div className="absolute right-2 top-2">
          {auction.status === "winning" ? (
            <Badge variant="success">Winning</Badge>
          ) : (
            <Badge variant="warning">Outbid</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <Link href={`/auctions/${auction.id}`} className="hover:underline">
          <h3 className="font-semibold">{auction.title}</h3>
        </Link>

        <div className="mt-2 flex flex-col space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Current Bid:</span>
            <span className="font-medium text-purple-600">
              ${auction.currentBid}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Your Bid:</span>
            <span
              className={`font-medium ${
                auction.status === "outbid" ? "text-red-600" : "text-green-600"
              }`}
            >
              ${auction.yourBid}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Time Left:</span>
            <span className="font-medium text-red-600">
              {auction.timeRemaining}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link href={`/auctions/${auction.id}`} className="flex-1">
            <Button variant="simple">Place Bid</Button>
          </Link>

          <Button variant="simple" outline={true}>
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
