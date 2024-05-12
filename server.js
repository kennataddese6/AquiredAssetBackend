const express = require("express");
const connectDB = require("./config/db");
const WebSocket = require("ws");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const wss = new WebSocket.Server({ noServer: true });
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
/* const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
}; */
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(/* corsOptions */));
/* app.use((req, res, next) => {
  if (!req.headers.origin) {
    return res.status(403).json({ error: "No origin header, request blocked" });
  }
  next();
}); */

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  })
);

app.use("/api/transactions", require("./routes/transactionRoute"));
app.use("/api/property", require("./routes/propertyRoutes"));
app.use("/api/auction", require("./routes/auctionRoutes"));
app.use("/api/user", require("./routes/userRoutes"));

const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
