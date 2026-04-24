import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { rateLimit } from "express-rate-limit";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.set("trust proxy", 1);

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests — please try again shortly." },
});

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions — please wait before trying again." },
});

const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Chat rate limit reached — please wait a few minutes." },
});

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  message: { error: "Too many login attempts — try again later." },
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

const allowedOrigins = process.env["CORS_ORIGIN"]
  ? process.env["CORS_ORIGIN"].split(",").map((o) => o.trim())
  : [];

// Admin routes never allow cross-origin access; all other routes use the allowlist.
app.use((req, res, next) => {
  const isAdminRoute = req.path.startsWith("/api/admin");
  cors({
    origin: (origin, callback) => {
      if (isAdminRoute) {
        callback(null, false);
        return;
      }
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })(req, res, next);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin/login", adminLoginLimiter);
app.use("/api/chat", chatLimiter);
app.use(["/api/contact", "/api/enrollments", "/api/testimonials", "/api/newsletter", "/api/bookings"], formLimiter);
app.use("/api", generalLimiter, router);

export default app;
