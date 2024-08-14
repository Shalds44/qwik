import { sql } from '@vercel/postgres';
import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ json, url }) => {
      console.log(url.searchParams.get('petName'))
    try {

        const result = await sql``;
        json(200, result);

      } catch (error) {
        json(500, error);
      }
  };