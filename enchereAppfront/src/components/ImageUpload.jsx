import { useRef } from "react";
import { HiDocumentArrowUp, HiPlus, HiXMark } from "react-icons/hi2";
import Card from "./Card";

const ImageUpload = ({ formData, setFormData, errors }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) => ({
      file,
      status: "new",
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => {
      const images = [...prev.images];
      const image = images[index];
      if (image.status === "new") {
        // Remove new images directly
        images.splice(index, 1);
      } else if (image.status === "existing") {
        // Mark existing images as deleted
        images[index] = { ...image, status: "deleted" };
      }
      return { ...prev, images };
    });
  };

  const activeImages = formData.images.filter(
    (img) => img.status !== "deleted"
  );

  return (
    <Card>
      <h1 className="text-xl font-bold">Item Images</h1>
      <p className="mt-2 text-muted-foreground">
        Upload images of your item. The first image will be the main image.
      </p>
      <div
        className="relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 mt-2"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="flex flex-col items-center space-y-2 text-center">
          <HiDocumentArrowUp className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-medium">Click to browse files</h3>
        </div>
      </div>

      {errors.images && (
        <p className="text-red-500 text-sm mt-2">{errors.images}</p>
      )}

      {activeImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 mt-4">
          {activeImages.map((image, index) => (
            <div
              key={`${image.status}-${image.url || image.file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-md border"
            >
              <img
                src={image.url || URL.createObjectURL(image.file)}
                alt={`Image ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(formData.images.indexOf(image));
                }}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 group-hover:opacity-100"
              >
                <HiXMark className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex aspect-square items-center justify-center rounded-md border border-dashed hover:border-primary/50 hover:bg-muted"
          >
            <HiPlus className="h-6 w-6 text-muted-foreground" />
          </button>
        </div>
      )}
    </Card>
  );
};

export default ImageUpload;
