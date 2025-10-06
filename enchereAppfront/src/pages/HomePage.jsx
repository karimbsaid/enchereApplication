import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { HiMagnifyingGlass } from "react-icons/hi2";
import FilterSidebar from "../components/FiltersSideBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tab";
import AuctionCard from "../components/AuctionCard";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";
import Pagination from "../components/Pagination";
export default function HomePage() {
  const [auctions, setAuctions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get("page") || 0, 10);
  const limit = parseInt(searchParams.get("limit") || 5, 10);
  const categoriesquery = searchParams.get("categories") || "";
  const conditionssquery = searchParams.get("conditions") || "";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const searchquery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchAuctions = async () => {
      const params = {
        category: categoriesquery,
        condition: conditionssquery,
        search: searchquery,
        page: currentPage,
        size: limit,
      };

      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await axiosInstance.get("/api/auctions", {
        params,
      });
      setTotalPages(response.totalPages);

      setAuctions(response.content);
    };

    fetchAuctions();
  }, [
    categoriesquery,
    setSearchParams,
    conditionssquery,
    searchquery,
    minPrice,
    maxPrice,
    currentPage,
    limit,
  ]);

  useEffect(() => {
    const getAllConditions = async () => {
      const response = await axiosInstance.get("/api/conditions");
      setConditions(response);
    };

    getAllConditions();
  }, []);

  useEffect(() => {
    const getAllCategories = async () => {
      const response = await axiosInstance.get("/api/categories");
      setCategories(response);
    };
    getAllCategories();
  }, []);
  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Discover Unique Items at Auction
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Bid on exclusive items from around the world. Find rare
              collectibles, art, and more.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 ">
            <div className="md:w-64 lg:w-72 col-span-1">
              <FilterSidebar conditions={conditions} categories={categories} />
            </div>

            <Button className="mb-4 flex items-center md:hidden">
              Filters
            </Button>

            <div className="flex-1 items-center col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                {auctions.map((auc) => (
                  <AuctionCard key={auc.id} auction={auc} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
