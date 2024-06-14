import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const password = process.env.DB_PASS;

    if (!password) {
      throw new Error('Database URL is not defined.');
    }

    const databaseUrl = process.env.DATABASE?.replace('<PASSWORD>', password);

    if (!databaseUrl) {
      throw new Error('Database URL is not defined.');
    }

    await mongoose.connect(databaseUrl);

    console.log('Connected to the database');
  } catch (error) {
    console.log('Error connecting to the database', error);
  }
};

export default connectDB;
