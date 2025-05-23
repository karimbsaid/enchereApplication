const API_URL = import.meta.env.VITE_API_URL;

export const getAuctionById = async (id, token) => {
  const response = await fetch(`${API_URL}/api/auctions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch auction with id ${id}`);
  }
  return await response.json();
};

// export const getAllAuctions = async (page = 0, size = 10) => {
//   const response = await fetch(`/api/auctions?page=${page}&size=${size}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch auctions");
//   }
//   return await response.json();
// };

export const placeBid = async (auctionId, token, amount) => {
  const response = await fetch(
    `${API_URL}/api/auctions/${auctionId}/bids?amount=${amount}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create auction");
  }

  return await response.json();
};

export const createAuction = async (auctionData, token) => {
  console.log("auction", auctionData);
  const { images, ...other } = auctionData;
  console.log(images);
  const formData = new FormData();

  formData.append(
    "auctions",
    new Blob([JSON.stringify(other)], { type: "application/json" })
  );

  images.forEach((img) => {
    formData.append("fileImages", img.file);
  });

  const response = await fetch(`${API_URL}/api/auctions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // only this header
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to create auction");
  }
  // console.log(await response.json());

  // return response.json();
};

export const updateAuction = async (
  id,
  auctionData = null,
  newImages = [],
  deletedImages = [],
  token
) => {
  console.log("update auction");
  const formData = new FormData();

  if (auctionData) {
    formData.append(
      "auctions",
      new Blob([JSON.stringify(auctionData)], { type: "application/json" })
    );
  }

  newImages.forEach((img) => {
    formData.append("fileImages", img.file); // Fichiers correctement ajoutés
  });

  // Correction ici : Créer un Blob pour deleteImages
  const deleteImagesBlob = new Blob([JSON.stringify(deletedImages)], {
    type: "application/json",
  });
  formData.append("deleteImages", deleteImagesBlob);
  // deletedImages.forEach((url) => {
  //   formData.append("deleteImages", url);
  // });

  for (const value of formData.values()) {
    console.log(value);
  }
  for (const key of formData.keys()) {
    console.log(key);
  }
  const response = await fetch(`${API_URL}/api/auctions/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to update auction with id ${id}`);
  }

  return await response.json();
};
export const getAllCategory = async (token) => {
  const response = await fetch(`${API_URL}/api/auctions/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await response.json();
};

export const getAllConditions = async (token) => {
  const response = await fetch(`${API_URL}/api/auctions/conditions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch conditions");
  }
  return await response.json();
};
