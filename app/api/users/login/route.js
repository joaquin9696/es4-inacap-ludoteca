import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

async function openDb() {
  return open({
    filename: path.join(process.cwd(), 'database.sqlite'), // Ruta relativa a la raíz del proyecto
    driver: sqlite3.Database,
  });
}

export async function POST(req) {
  try {
    const db = await openDb();
    const { username, password } = await req.json();
    console.log('Received username:', username);
    console.log('Received password:', password);

    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    console.log('User found:', user);

    if (user) {
      return NextResponse.json({ success: true, user });
    } else {
      return NextResponse.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ success: false, message: 'An error occurred' });
  }
}
