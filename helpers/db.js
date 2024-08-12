import * as SQLite from 'expo-sqlite';

// Open (or create if it doesn't exist) the 'places.db' database
const openDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('places.db');
    return db;
  } catch (error) {
    console.error('Failed to open database:', error);
    throw error;
  }
};

// Initialize the database
export const init = async () => {
  const db = await openDatabase();
  
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL, 
        title TEXT NOT NULL, 
        imageUri TEXT NOT NULL, 
        address TEXT NOT NULL, 
        lat REAL NOT NULL, 
        lng REAL NOT NULL
      );
    `);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
};
export const insertPlace = async (title, imageUri, address, lat, lng) => {
    const db = await openDatabase();
    try {
      const result = await db.runAsync(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)', 
        [title, imageUri, address, lat, lng]
      );
      return result;
    } catch (error) {
      console.error('Insert Place Error:', error);
      throw error;
    }
  };
  export const fetchPlaces = async () => {
    const db = await openDatabase();
    try {
      const result = await db.getAllAsync('SELECT * FROM places');
      console.log('Fetch Places Result:', result);
      
      // Since the result is an array, return it directly
      if (Array.isArray(result)) {
        return result;
      } else {
        console.warn('Unexpected result format:', result);
        return []; // Return an empty array if the result format is not as expected
      }
    } catch (error) {
      console.error('Fetch Places Error:', error);
      throw error;
    }
  };
  
