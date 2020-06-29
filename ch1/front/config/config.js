const backUrl =
  process.env.NODE_ENV === "production"
    ? "http://api.stefancho.gq"
    : "http://localhost:3065";
const frontUrl =
  process.env.NODE_ENV === "production"
    ? "http://stefancho.gq"
    : "http://localhost:3060";

export { backUrl, frontUrl };
