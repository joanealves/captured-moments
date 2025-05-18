import jwt from "jsonwebtoken";

export class AuthUtils {
  static generateAccessToken(userId: string): string {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET not defined!")
    }
    
    return jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "72h" }
    )
  }
  
  static verifyAccessToken(token: string): { userId: string } {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET not defined!")
    }
    
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { userId: string };
  }
}