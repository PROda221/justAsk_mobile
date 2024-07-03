import { Platform } from "react-native";

const allGenres = [
    "Health & Fitness",
    "Relationships",
    "Psycology",
    "Financial",
    "Career",
    "Education",
    "Entrepreneurship",
    "Politics",
    "Diet",
    "Fashion",
    "Family",
    "Pets",
    "Medicine",
    "Cooking",
    "Movies",
    "Music",
    "Games",
    "Vehicals",
    "Plants",
    "Yoga",
    "Culture",
    "Dancing",
    "Spiritual",
    "Technology",
    "Coding",
    "Traveling",
  ];

  const baseURL = Platform.OS === 'android' ? 'http://10.0.2.2:8001' : 'http://localhost:8001'
  // const baseURL = "https://justask-backend.onrender.com"

  export {allGenres, baseURL}