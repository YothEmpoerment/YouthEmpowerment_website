import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Youth Empowerment",
    short_name: "Youth Empowerment",
    description: "Youth Empowerment connects students, mentors, and industry professionals to learn, grow, and build impactful careers in technology.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#044ead",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
