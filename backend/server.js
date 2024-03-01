import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRouter.js';
import tutorRoutes from './routes/tutorRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import Stripe from 'stripe';
import { Server } from 'socket.io';
import path from 'path';

const stripe = new Stripe('sk_test_51O9tFFSDsPPMBnLnMdMtou8UwIWhDpQJl3hXgNqJCjBwaWNDXXkDcnCvRUuvGJegH2TKKMthVMz9fNNvBasBLXGi00Bg41xYtX');
const app = express();

dotenv.config();
const corsOptions = {
  origin: 'https://www.skillsync.website',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,  // Allow sending cookies
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Serve static files from the 'frontend/dist' folder

const port = 5000;

app.use(express.static("backend/public"));
app.use("/images",express.static("public/images"));
app.use("/videos",express.static("public/videos"));
app.use("/pdf",express.static("public/pdf"));

app.use('/api', userRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/admin', adminRoutes);

// Handle all routes by serving 'index.html' from the 'frontend/dist' folder
const __dirname = path.resolve();
const dirname = (__dirname, "..");

app.use(express.static(path.join(dirname, "frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"))
);

const server = app.listen(port, () => {
  console.log('server is running');
});

const io = new Server(server, {
  pingTimeout: 1000,
  cors: {
    origin: 'https://www.skillsync.website/api',
  },
});

io.on('connection', (socket) => {
  socket.on('live_started', () => {
    
    socket.broadcast.emit('track_live');
  });
  socket.on('live_added', () => {
   
    socket.broadcast.emit('track_live');
  });
  socket.on('end_live', () => {
    
    socket.broadcast.emit('track_live');
  });
  socket.on('delete_live', () => {
    
    socket.broadcast.emit('track_live');
  });
});
