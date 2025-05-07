import mysql from 'mysql2/promise';

console.log('Conectando com usuário:', process.env.DB_USER);

export const db = mysql.createPool({
  host: 'db4free.net',
  user: 'usuarios2025poni',
  password: 'usuarios2025poni',
  database: 'usuarios2025poni',
});
