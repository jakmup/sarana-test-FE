import axios from "axios";

const API_BASE = "https://api.test.cms.saranatechnology.com/api/v1/login";

export const login = async (email: string) => {
  const response = await axios.post(API_BASE, { email });
  console.log("Full API response:", response.data); // ✅ Debugging log

  return response.data.data.token; // ✅ Extract the token correctly
};
