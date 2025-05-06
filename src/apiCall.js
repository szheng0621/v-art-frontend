import axios from "axios";
import Collections from "./components/Collections";

const api = axios.create({
  baseURL: "https://v-art-backend.onrender.com/api",
});

const getArtworks = ({
  sort_by = "created_at",
  order = "desc",
  limit = 9,
  page = 1,
} = {}) => {
  return api
    .get("/artworks", {
      params: { sort_by, order, limit, page },
    })
    .then(({ data: { artworks } }) => {
      return artworks;
    });
};

const getArtworkById = (artwork_id) => {
  return api.get(`/artworks/${artwork_id}`).then(({ data }) => {
    return data.artwork;
  });
};

const getCollections = () => {
  return api
    .get(`/collections`)
    .then(({ data }) => {
      return data.collections;
    })
    .catch((err) => {
      return err;
    });
};

const getArtworksByCollection = ({
  sort_by = "created_at",
  order = "desc",
  collection = null,
  limit = 9,
  page = 1,
} = {}) => {
  return api
    .get("/artworks", { params: { sort_by, order, collection, limit, page } })
    .then(({ data: { artworks } }) => {
      return artworks;
    })
    .catch((err) => {
      throw new Error(
        err.response?.data?.message || "Failed to fetch artworks"
      );
    });
};

const getUserExhibitionsWithArtworks = ({
  username,
  collection,
  sort_by = "created_at",
  order = "desc",
  limit = 9,
  page = 1,
} = {}) => {
  return api
    .get(`/users/${username}/exhibitions`, {
      params: { collection, sort_by, order, limit, page },
    })
    .then(({ data }) => {
      return {
        exhibitions: data.exhibitions,
        groupedArtworks: data.groupedArtworks,
      };
    });
};

const postArtworkToUserExhibition = (username, exhibition_id, artwork_id) => {
  return api
    .post(`/users/${username}/exhibitions/${exhibition_id}/artworks`, {
      artwork_id,
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Error: failed to add artwork", error);
      throw error;
    });
};

const deleteArtworkById = (username, exhibition_id, artwork_id) => {
  return api
    .delete(
      `/users/${username}/exhibitions/${exhibition_id}/artworks/${artwork_id}`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log("error, can not delete artwork");
      return error;
    });
};

export {
  getArtworks,
  getArtworkById,
  getCollections,
  getArtworksByCollection,
  getUserExhibitionsWithArtworks,
  postArtworkToUserExhibition,
  deleteArtworkById,
};
