"use client";

import { useEffect, useState } from "react";
import ImageUpload from "../components/ImageUpload";
import ItemDetails from "../feature/auctionCreation/ItemDetails";
import AuctionSettings from "../feature/auctionCreation/AuctionSettings";
import Button from "../components/Button";
import {
  createAuction,
  getAuctionById,
  updateAuction,
} from "../service/apiAuction";
import { useAuth } from "../context/authContext";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../service/axiosInstance";

export default function CreateAuctionPage() {
  const { user, isLoading } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startPrice: "",
    endTime: "",
    category: "",
    condition: "",
    images: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [token, setToken] = useState("");
  const { auctionId } = useParams();
  useEffect(() => {
    if (user && !isLoading) {
      setToken(user.token);
    }
  }, [isLoading, user]);

  function prepareAuctionUpdate(formData) {
    let updatedFields = {};
    const newImages = [];
    const deletedImages = [];
    const { images, updated, ...other } = formData;

    if (formData.updated) {
      updatedFields = { ...other };
    }

    if (images) {
      images.forEach((img) => {
        if (img.status === "new") {
          // Conserver l'objet entier avec 'file' et 'status'
          newImages.push(img);
        } else if (img.status === "deleted") {
          deletedImages.push(img.url);
        }
      });
    }

    return {
      updatedFields,
      newImages,
      deletedImages,
    };
  }

  useEffect(() => {
    const fetchAuctionData = async () => {
      const auctionData = await axiosInstance.get(`/api/auctions/${auctionId}`);
      const formattedData = {
        title: auctionData.title || "",
        description: auctionData.description || "",
        startPrice: auctionData.startPrice || "",
        endTime: auctionData.endTime
          ? new Date(auctionData.endTime).toISOString().slice(0, 16)
          : "",
        category: auctionData.category?.id || "",
        condition: auctionData.condition?.id || "",
        images: (auctionData.imageUrls || []).map((url) => ({
          url,
          status: "existing",
        })),
        bids: auctionData.bids || [],
      };
      setFormData(formattedData);
    };
    if (auctionId) {
      setIsEdit(true);
      fetchAuctionData();
    }
  }, [auctionId]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.startPrice) {
      newErrors.startPrice = "Starting price is required";
    } else if (
      isNaN(Number.parseFloat(formData.startPrice)) ||
      Number.parseFloat(formData.startPrice) <= 0
    ) {
      newErrors.startPrice = "Starting price must be a positive number";
    }

    if (!formData.endTime) {
      newErrors.endTime = "End date is required";
    } else {
      const selectedDate = new Date(formData.endTime);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.endTime = "End date must be in the future";
      }
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.condition) {
      newErrors.condition = "Condition is required";
    }

    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      if (isEdit) {
        const { updatedFields, newImages, deletedImages } =
          prepareAuctionUpdate(formData);
        await updateAuction(
          auctionId,
          updatedFields,
          newImages,
          deletedImages,
          token
        );
      } else {
        await createAuction(formData, token);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
      navigate("/dashboard");
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Create New Auction</h1>
        <p className="mt-2 text-muted-foreground">
          Fill out the form below to list your item for auction.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <ImageUpload
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />

            <ItemDetails
              isEdit={isEdit}
              formData={formData}
              setFormData={setFormData}
              token={token}
              errors={errors}
            />

            <AuctionSettings
              formData={formData}
              setFormData={setFormData}
              isEdit={isEdit}
              errors={errors}
            />

            <Button
              type="submit"
              className="w-full sm:w-auto border border-gray-500 p-2 bg-black text-white"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? isEdit
                    ? "Editing Auction..."
                    : "Creating Auction..."
                  : isEdit
                  ? "Update Auction"
                  : "Create Auction"}
              </span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
