import Card from "../../components/Card";
import Input from "../../components/Input";
import { HiCalendar, HiCurrencyDollar } from "react-icons/hi2";

const AuctionSettings = ({ formData, setFormData, isEdit, errors }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(isEdit ? { updated: true } : {}),
    }));
  };

  return (
    <Card>
      <h1 className="text-2xl font-semibold text-gray-800">Auction Settings</h1>
      <p className="text-sm text-gray-500 mb-4">
        Set your starting price and auction duration.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="startPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Starting Price ($)
          </label>
          <div className="relative">
            <HiCurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              id="startPrice"
              name="startPrice"
              type="number"
              placeholder="0.00"
              disabled={formData?.bids?.length > 0}
              className="pl-10 pr-3 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.startPrice}
              onChange={handleInputChange}
              min="0.01"
              step="0.01"
            />
            {errors.startPrice && (
              <p className="text-red-500 text-sm">{errors.startPrice}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Date & Time
          </label>
          <div className="relative">
            <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              disabled={formData?.bids?.length > 0}
              id="endTime"
              name="endTime"
              type="datetime-local"
              className="pl-10 pr-3 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.endTime}
              onChange={handleInputChange}
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm">{errors.endTime}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AuctionSettings;
