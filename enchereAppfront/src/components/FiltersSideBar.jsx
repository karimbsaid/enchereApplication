import React, { useEffect, useState } from "react";
import Input from "./Input"; // Your custom Input component
import Button from "./Button";
import { HiXMark, HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

export default function FilterSidebar({ categories, conditions }) {
  const [priceRange, setPriceRange] = useState(["", ""]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      searchParams.set("search", searchQuery);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }, [searchQuery]);

  useEffect(() => {
    if (priceRange[0] !== "") {
      searchParams.set("minPrice", priceRange[0]);
    } else {
      searchParams.delete("minPrice");
    }

    if (priceRange[1] !== "") {
      searchParams.set("maxPrice", priceRange[1]);
    } else {
      searchParams.delete("maxPrice");
    }

    setSearchParams(searchParams);
  }, [priceRange]);

  useEffect(() => {
    const categoriesQuery = searchParams.get("categories");
    if (categoriesQuery) {
      const categoriesArray = categoriesQuery.split(",");
      setSelectedCategories(categoriesArray);
    }
  }, [searchParams]);

  useEffect(() => {
    const conditionsQuery = searchParams.get("conditions");
    if (conditionsQuery) {
      const conditionsArray = conditionsQuery.split(",");
      setSelectedConditions(conditionsArray);
    }
  }, [searchParams]);
  const toggleCategory = (categoryId) => {
    let newCategories;

    if (selectedCategories.includes(categoryId)) {
      newCategories = selectedCategories.filter((id) => id !== categoryId);
    } else {
      newCategories = [...selectedCategories, categoryId];
    }

    setSelectedCategories(newCategories);
    if (newCategories.length > 0) {
      searchParams.set("categories", newCategories.join(","));
    } else {
      searchParams.delete("categories");
    }
    setSearchParams(searchParams);
  };

  const toggleCondition = (id) => {
    let newConditions;

    if (selectedConditions.includes(id)) {
      newConditions = selectedConditions.filter((id) => id !== id);
    } else {
      newConditions = [...selectedConditions, id];
    }
    setSelectedConditions(newConditions);
    if (newConditions.length > 0) {
      searchParams.set("conditions", newConditions.join(","));
    } else {
      searchParams.delete("conditions");
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
    setSelectedCategories([]);
    setSelectedConditions([]);
  };

  const activeFilterCount =
    (selectedCategories.length > 0 ? 1 : 0) +
    (selectedConditions.length > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFilterCount > 0 && (
          <Button onClick={clearAllFilters} className="text-sm text-blue-500">
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search auctions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 pr-10 py-2 w-full border rounded"
        />
        {searchQuery && (
          <Button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-2 text-gray-500"
          >
            <HiXMark className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-medium mb-2">Price Range</h3>
        <div className="flex gap-4 items-center">
          <Input
            type="number"
            value={priceRange[0] === 0 ? "" : priceRange[0]}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setPriceRange(["", priceRange[1]]);
              } else {
                const parsed = parseInt(val);
                if (!isNaN(parsed) && parsed <= priceRange[1]) {
                  setPriceRange([parsed, priceRange[1]]);
                }
              }
            }}
            className="w-24 px-2 py-1 border rounded"
            min={0}
            max={priceRange[1]}
          />
          <span>to</span>
          <Input
            type="number"
            value={priceRange[1] === 0 ? "" : priceRange[1]}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setPriceRange([priceRange[0], ""]);
              } else {
                const parsed = parseInt(val);
                if (!isNaN(parsed) && parsed >= priceRange[0]) {
                  setPriceRange([priceRange[0], parsed]);
                }
              }
            }}
            className="w-24 px-2 py-1 border rounded"
            min={priceRange[0]}
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium mb-2">Categories</h3>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Input
              type="checkbox"
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.name)}
              onChange={() => toggleCategory(category.name)}
              className="h-4 w-4 accent-blue-600"
            />
            <label
              htmlFor={`category-${category.id}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>

      {/* Conditions */}
      <div>
        <h3 className="text-sm font-medium mb-2">Condition</h3>
        {conditions.map((condition) => (
          <div key={condition.id} className="flex items-center space-x-2">
            <Input
              type="checkbox"
              id={`condition-${condition.id}`}
              checked={selectedConditions.includes(condition.name)}
              onChange={() => toggleCondition(condition.name)}
            />
            <label htmlFor={`condition-${condition.id}`} className="text-sm">
              {condition.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
