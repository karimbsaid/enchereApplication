import React from "react";
import Table from "../../components/Table";

export default function BidRow({ bid }) {
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
    <>
      <Table.Row>
        <Table.Cell>{bid.bidder.userName}</Table.Cell>
        <Table.Cell>{bid.amount}</Table.Cell>
        <Table.Cell>{formatDate(bid.createdAt)}</Table.Cell>
      </Table.Row>
    </>
  );
}
