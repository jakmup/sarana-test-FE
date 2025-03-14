import axios from "axios";

const API_BASE = "https://api.test.cms.saranatechnology.com/api/v1/user/article";

const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

// ✅ Fetch articles and return only the `data` array
export const getArticles = async (token: string) => {
  console.log("Fetching articles with token:", token);

  const response = await axios.get(API_BASE, getAuthHeaders(token));
  console.log("API response:", response.data); // ✅ Debugging log

  return response.data.data || []; // ✅ Return only the articles array
};

// ✅ Create an article
export const createArticle = async (token: string, data: any) => {
  console.log("Creating article with token:", token, "Data:", data);
  return axios.post(API_BASE, data, getAuthHeaders(token));
};

// ✅ Update an article
export const updateArticle = async (token: string, id: string, data: any) => {
  console.log("Updating article with token:", token, "ID:", id, "Data:", data);
  return axios.put(`${API_BASE}/${id}`, data, getAuthHeaders(token)); // ✅ Fixed template string
};

// ✅ Delete an article
export const deleteArticle = async (token: string, id: string) => {
  console.log("Deleting article with token:", token, "ID:", id);
  return axios.delete(`${API_BASE}/${id}`, getAuthHeaders(token)); // ✅ Fixed template string
};
