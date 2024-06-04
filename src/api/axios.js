import axios from "axios";

// Log environment variables to ensure they are loaded correctly
console.log("Base URL:", process.env.REACT_APP_BASE_URL);
console.log("Email:", process.env.REACT_APP_EMAIL);

const axiosPrivate = axios.create({
  //   baseURL: process.env.REACT_APP_BASE_URL, // Ensure no extra characters here
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Basic ${btoa(
      `${process.env.REACT_APP_EMAIL}:${process.env.REACT_APP_JIRA_API_KEY}`
    )}`,
  },
  withCredentials: true,
});

export default axiosPrivate;
