import jwt from "jsonwebtoken";

export function generateAccessToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload: { id: string; email: string }) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}
