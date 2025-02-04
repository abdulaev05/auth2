import './dotenv-config.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index.js';
import errorMiddleware from './middlewares/error-middleware.js';

const app = express();
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

// Функция старта
const startServer = async () => {
  const port = process.env.PORT || 5000;
  const db_url = process.env.DB_URL;

  await mongoose.connect(db_url);

  app.listen(port, (err) => {
    if (err) {
      console.error('Ошибка при запуске сервера:', err);
      return;
    }
    console.log(`Сервер запущен на порту ${port}`);
  });
};

// Обработчик ошибок
app.use((err, res) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});

// Запуск сервера
startServer();
