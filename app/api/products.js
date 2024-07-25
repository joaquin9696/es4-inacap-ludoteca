import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function openDb() {
  return open({
    filename: '/mnt/data/database.sqlite',
    driver: sqlite3.Database,
  });
}

export async function GET() {
  const db = await openDb();
  const products = await db.all('SELECT * FROM products');
  return NextResponse.json(products);
}
