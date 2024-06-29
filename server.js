const express = require("express");
const connectDB = require("./config/db");
const WebSocket = require("ws");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const path = require("path");
const wss = new WebSocket.Server({ noServer: true });
const uploadDir = path.join(__dirname, "uploads");
dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const corsOptions = {
  origin: JSON.parse(process.env.ORIGINS),
  credentials: true,
  optionsSuccessStatus: 200,
};
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());
/* app.use((req, res, next) => {
  if (!req.headers.origin) {
    return res.status(403).json({ error: "No origin header, request blocked" });
  }
  next();
}); */
app.set("trust proxy", 1); // if there's one proxy between the server and the client

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "https:"],
      scriptSrc: ["'self'", "https:"],
      styleSrc: ["'self'", "https:"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      fontSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'", "https:"],
      frameSrc: ["'none'"],
    },
  })
);

app.use("/api/transactions", require("./routes/transactionRoute"));
app.use("/api/plan", require("./routes/planRoutes"));
app.use("/api/property", require("./routes/propertyRoutes"));
app.use("/api/auction", require("./routes/auctionRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/file", express.static(uploadDir));

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
