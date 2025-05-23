import { useEffect, useState } from "react";
import Card from "../../components/Card";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import { getAllCategory, getAllConditions } from "../../service/apiAuction";
import Button from "../../components/Button";
import { HiChevronDown } from "react-icons/hi2";
import axiosInstance from "../../service/axiosInstance";

const ItemDetails = ({ formData, setFormData, token, isEdit, errors }) => {
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);

  // Add state to track selected category and condition names
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedConditionName, setSelectedConditionName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(isEdit ? { updated: true } : {}),
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/api/categories");
      setCategories(response);
      // If formData already has a category ID, find and set the name
      if (formData.category) {
        const selectedCategory = categories.find(
          (cat) => cat.id === formData.category
        );
        if (selectedCategory) {
          setSelectedCategoryName(selectedCategory.name);
        }
      }
    };

    const fetchConditions = async () => {
      const response = await axiosInstance.get("/api/conditions");
      setConditions(response);

      // If formData already has a condition ID, find and set the name
      if (formData.condition) {
        const selectedCondition = conditions.find(
          (cond) => cond.id === formData.condition
        );
        if (selectedCondition) {
          setSelectedConditionName(selectedCondition.name);
        }
      }
    };

    if (token) {
      fetchCategories();
      fetchConditions();
    }
  }, [token, formData.category, formData.condition]);

  // Handle category selection - set both ID and name
  const handleCategoryChange = (categoryId) => {
    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    if (selectedCategory) {
      setSelectedCategoryName(selectedCategory.name);
      setFormData((prev) => ({
        ...prev,
        category: categoryId,
        ...(isEdit ? { updated: true } : {}),
      }));
    }
  };

  // Handle condition selection - set both ID and name
  const handleConditionChange = (conditionId) => {
    const selectedCondition = conditions.find(
      (cond) => cond.id === conditionId
    );
    if (selectedCondition) {
      setSelectedConditionName(selectedCondition.name);
      setFormData((prev) => ({
        ...prev,
        condition: conditionId,
        ...(isEdit ? { updated: true } : {}),
      }));
    }
  };

  return (
    <Card>
      <h1 className="text-3xl font-bold">Item Details</h1>
      <p className="mt-2 text-muted-foreground mb-2">
        Provide information about the item you're selling.
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            label="Title"
            id="title"
            name="title"
            placeholder="Enter a descriptive title"
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your item in detail"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <DropDown
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <DropDown.Trigger>
                <Button
                  type="button"
                  className="w-full justify-between border border-gray-500 flex items-center p-2 rounded-t-md"
                >
                  {selectedCategoryName || "Select Category"}
                  <HiChevronDown />
                </Button>
              </DropDown.Trigger>

              <DropDown.Window>
                {categories.map((category) => (
                  <DropDown.Item key={category.id} value={category.id}>
                    <span>{category.name}</span>
                  </DropDown.Item>
                ))}
              </DropDown.Window>
            </DropDown>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="conditions"
              className="block text-sm font-medium text-gray-700"
            >
              Condition
            </label>
            <DropDown
              value={formData.condition}
              onValueChange={handleConditionChange}
            >
              <DropDown.Trigger>
                <Button className="w-full justify-between border border-gray-500 flex items-center p-2 rounded-t-md">
                  {selectedConditionName || "Select Condition"}
                  <HiChevronDown />
                </Button>
              </DropDown.Trigger>

              <DropDown.Window>
                {conditions.map((cond) => (
                  <DropDown.Item key={cond.id} value={cond.id}>
                    <span>{cond.name}</span>
                  </DropDown.Item>
                ))}
              </DropDown.Window>
            </DropDown>
            {errors.condition && (
              <p className="text-red-500 text-sm">{errors.condition}</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemDetails;
