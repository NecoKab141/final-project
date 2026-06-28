import axios from "axios";

const BASE_URL =
  "https://6a2e6c31c9776ca6c0c49945.mockapi.io/";

export const registerUser = async (
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${BASE_URL}/users`,
    {
      email,
      password,
    }
  );

  return response.data;
};