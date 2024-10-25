import { rateLimit } from "express-rate-limit";

export const rateLimitChange = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "You have exceeded your 5 requests per minute limit for change data.",
  headers: true,
  validate: { xForwardedForHeader: false },
});

export const rateLimitGet = rateLimit({
  windowMs: 1000,
  max: 3,
  message: "You have exceeded your 3 requests per second limit for get data.",
  headers: true,
  validate: { xForwardedForHeader: false },
});
