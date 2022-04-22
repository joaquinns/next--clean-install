import { pool } from "config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await setSearch(req, res);
  }
}

const setSearch = async (req, res) => {
  try {
    const { search } = req.query;
    console.log(search);
    const [result] = await pool.query(
      `SELECT * FROM article WHERE (articletitle LIKE '%${search}%') OR (description LIKE '%${search}%')`
    );
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};