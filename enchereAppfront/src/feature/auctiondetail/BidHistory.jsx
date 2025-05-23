import React from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import BidRow from "./BidRow";
export default function BidHistory({ auction }) {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-medium">Bid History</h3>
      <div className="max-h-[300px] overflow-y-auto">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.Head>Bidder</Table.Head>
              <Table.Head className="text-right">Amount</Table.Head>
              <Table.Head className="text-right">Time</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body
            data={auction.bids || []}
            render={(bid) => <BidRow bid={bid} key={bid.id} />}
          />
        </Table>
      </div>
    </Card>
  );
}
