import axios from "axios";

export const getCollection = async () => {
  try {
    const collection = await axios.get(
      "https://api.unsplash.com/collections/R3ygDhKwtyw/photos?page=1&per_page=30",
      {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    return collection.data;
  } catch (err) {
    throw new Error(err);
  }
};
