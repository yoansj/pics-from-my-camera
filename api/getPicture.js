import axios from "axios";

export const getPicture = async (id) => {
  try {
    const picture = await axios.get(`https://api.unsplash.com/photos/${id}`, {
      headers: {
        Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
      },
    });
    return picture.data;
  } catch (err) {
    throw new Error(err);
  }
};
