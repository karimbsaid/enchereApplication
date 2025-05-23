import React from "react";

import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
const AuctionCardOwner = ({ auction, onEdit, onDelete }) => {
  console.log(auction);
  const navigate = useNavigate();
  const handleNavigateAuctionDetail = () => {
    navigate(`/auctions/${auction.id}`);
  };

  const now = new Date();
  const endTime = new Date(auction.endTime); // Make sure field is "endTime"
  const hasBids = auction.bids.length > 0;

  const disableDelete = endTime > now || hasBids;

  return (
    <div
      onClick={handleNavigateAuctionDetail}
      className="bg-white shadow-md rounded-2xl overflow-hidden p-4 w-full max-w-sm"
    >
      <img
        src={auction.imageUrls?.[0] || "./placeholder.png"}
        alt={auction.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        {auction.title}
      </h2>
      <div className="flex justify-between mt-4">
        <Button
          variant="simple"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(auction.id);
          }}
        >
          <HiMiniPencilSquare className="w-4 h-4" />
          Modifier
        </Button>
        <Button
          variant="ghost"
          disabled={disableDelete}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(auction.id);
          }}
        >
          <HiTrash className="w-4 h-4" />
          Supprimer
        </Button>
      </div>
    </div>
  );
};

export default AuctionCardOwner;
