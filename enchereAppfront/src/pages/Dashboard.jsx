import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../service/axiosInstance";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tab";
import AuctionCard from "../components/AuctionCard";
import AuctionCardOwner from "../components/AuctionCardOwner";
import { useNavigate } from "react-router-dom";
import { Modal, ModalContext } from "../components/Modal";
import ConfirmDelete from "../components/ConfirmDelete";
import Button from "../components/Button";
import { HiPlus } from "react-icons/hi2";

export default function Dashboard() {
  return (
    <Modal>
      <DashboardContent />
    </Modal>
  );
}

function DashboardContent() {
  const [myBidsAuctions, setAuctionsBid] = useState([]);
  const [myAuctions, setMyAuctions] = useState([]);
  const [auctionTodelete, setAuctionDelete] = useState("");
  const { open, close } = useContext(ModalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyBidAuctions = async () => {
      const response = await axiosInstance.get("/api/mybids");
      setAuctionsBid(response);
    };
    const getMyAuctions = async () => {
      const response = await axiosInstance.get("/api/auctions/myauctions");
      console.log(response);
      setMyAuctions(response);
    };
    getMyBidAuctions();
    getMyAuctions();
  }, []);

  const handleOpenModalDelete = (auctionId) => {
    setAuctionDelete(auctionId);
    open("delete-confirm");
  };

  const handleDeleteAuction = async () => {
    await axiosInstance.delete(`/api/auctions/${auctionTodelete}`);
    setMyAuctions((prev) => prev.filter((a) => a.id !== auctionTodelete));
    close(); // ferme le modal après suppression
  };

  const handleEditAuctionNavigation = (auctionId) => {
    navigate(`/auctions/update/${auctionId}`);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your auctions, bids, and account settings.
          </p>
        </div>
        <Button onClick={() => navigate("/auctions/new")}>
          <HiPlus className="w-4 h-4" />
          add auction
        </Button>
      </div>

      <Tabs defaultValue="mybids" className="mb-8">
        <TabsList className="mb-4 flex justify-center gap-4">
          <TabsTrigger value="mybids">My bids </TabsTrigger>
          <TabsTrigger value="myauctions">Selling</TabsTrigger>
        </TabsList>
        <TabsContent
          value="mybids"
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          {myBidsAuctions.map((auc) => (
            <AuctionCard key={auc.id} auction={auc} />
          ))}
        </TabsContent>
        <TabsContent
          value="myauctions"
          className="grid grid-cols-1 md:grid-cols-4 gap-5"
        >
          {myAuctions.map((auc) => (
            <AuctionCardOwner
              key={auc.id}
              auction={auc}
              onDelete={() => handleOpenModalDelete(auc.id)}
              onEdit={handleEditAuctionNavigation}
            />
          ))}
        </TabsContent>
      </Tabs>
      <Modal.Window name="delete-confirm">
        <ConfirmDelete
          confirmationText="SUPPRIMER"
          onClose={close}
          onConfirm={handleDeleteAuction}
        />
      </Modal.Window>
    </>
  );
}
