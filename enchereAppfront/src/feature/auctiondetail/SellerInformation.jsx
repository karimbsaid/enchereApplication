import React from "react";
import Card from "../../components/Card";
export default function SellerInformation({ auction }) {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-medium">Seller Information</h3>
      <div className="flex items-center space-x-3">
        <div>
          <p className="font-medium">{auction.seller.userName}</p>
        </div>
      </div>
    </Card>
  );
}
