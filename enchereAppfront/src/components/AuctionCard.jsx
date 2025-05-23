import { HiOutlineClock, HiHeart, HiMiniHeart } from "react-icons/hi2"; // added HiHeart and solid heart
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";

const AuctionCard = ({ auction }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation(); // prevent navigation
    setIsFavorite((prev) => !prev);
    axiosInstance.post(`/api/favorites/${auction.id}`);

    // Optionally call backend here to persist favorite status
  };
  useEffect(() => {
    const fetchFavorite = async () => {
      try {
        const res = await axiosInstance.get(`/api/favorites/${auction.id}`);
        setIsFavorite(res === true);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFavorite();
  }, []);

  const handleNavigateAuctionDetail = () => {
    navigate(`/auctions/${auction.id}`);
  };

  const getTimeSinceCreated = (createdAt) => {
    const now = Date.now();
    const created = new Date(createdAt).getTime();
    const diffMs = now - created;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div className="rounded-xl max-w-64 border bg-white shadow transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
      <div
        className="relative cursor-pointer"
        onClick={handleNavigateAuctionDetail}
      >
        <div className="aspect-[4/3] max-h-64 overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800">
          <img
            src={auction.imageUrls?.[0] || "/placeholder.svg"}
            alt={auction.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>

        {/* Category Tag */}
        {auction.category && (
          <div className="absolute left-2 top-2 z-10">
            <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-medium dark:bg-gray-700 dark:text-white">
              {typeof auction.category === "object"
                ? auction.category.name
                : auction.category}
            </span>
          </div>
        )}

        {/* Favorite Icon */}
        <button
          onClick={handleToggleFavorite}
          className="absolute right-2 top-2 z-10  hover:scale-110 transition"
        >
          {isFavorite ? (
            <HiMiniHeart className="h-6 w-6 fill-red-500" />
          ) : (
            <HiHeart className="h-6 w-6 fill-white" />
          )}
        </button>
      </div>

      <div className="p-4">
        <h3
          onClick={handleNavigateAuctionDetail}
          className="line-clamp-1 cursor-pointer font-semibold text-gray-800 hover:underline dark:text-white"
        >
          {auction.title}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current Bid
            </p>
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
              ${auction.bids?.[0]?.amount ?? "0.00"}
            </p>
          </div>

          {auction.timeRemaining && (
            <div className="text-right">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Time Left
              </p>
              <p className="flex items-center text-sm font-medium text-red-600 dark:text-red-400">
                <HiOutlineClock className="mr-1 h-4 w-4" />
                {getTimeSinceCreated(auction.createdAt)}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleNavigateAuctionDetail}
          className="mt-3 w-full rounded-md bg-purple-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          Place Bid
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;
