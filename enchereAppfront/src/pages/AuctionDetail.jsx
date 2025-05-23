import { HiChevronLeft } from "react-icons/hi2";

import BidHistory from "../feature/auctiondetail/BidHistory";
import BidCard from "../feature/auctiondetail/BidCard";
import SellerInformation from "../feature/auctiondetail/SellerInformation";
import AuctionDescription from "../feature/auctiondetail/AuctionDescription";
import Carousel from "../components/Caroussel";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import useWebSocket from "../hooks/useWebSocket";
import axiosInstance from "../service/axiosInstance";

export default function AuctionDetailPage() {
  const [auctionData, setAuctionData] = useState({});
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const [loading, setLoading] = useState(true);

  const { user, isLoading } = useAuth();
  const { auctionId } = useParams();

  useEffect(() => {
    const fetchAuctionDetail = async () => {
      try {
        const auctionData = await axiosInstance.get(
          `/api/auctions/${auctionId}`
        );
        setAuctionData(auctionData);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user && !isLoading) {
      fetchAuctionDetail();
    }
  }, [auctionId, isLoading, user, refetchTrigger]);
  useWebSocket({
    auctionId,
    onMessage: (newBid) => {
      setAuctionData((prevData) => ({
        ...prevData,
        bids: [newBid, ...(prevData.bids || [])],
      }));
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <Link
        to="/"
        className="mb-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <HiChevronLeft className="mr-1 h-4 w-4" />
        Back to auctions
      </Link>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-2">
          <Carousel
            images={auctionData.imageUrls}
            title={auctionData.title}
            showThumbnails
          />
          <AuctionDescription auction={auctionData} />
        </div>

        <div className="flex flex-col space-y-6">
          <BidCard
            auction={auctionData}
            onBidSuccess={() => setRefetchTrigger((prev) => prev + 1)}
          />
          <SellerInformation auction={auctionData} />
          <BidHistory auction={auctionData} />
        </div>
      </div>
    </div>
  );
}
