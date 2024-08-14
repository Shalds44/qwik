import type { RequestHandler } from '@builder.io/qwik-city';
import { sql } from '@vercel/postgres';

export const onGet: RequestHandler = async ({ json }) => {
  try {
    const result =
      await sql`CREATE TABLE Pets ( Name varchar(255), Owner varchar(255) );`;
    json(200, { result });
  } catch (error) {
    json(200, { error });
  }

};