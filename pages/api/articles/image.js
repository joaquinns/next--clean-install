import { pool } from "../../../config/db";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getImage(req, res);
    case "POST":
      return await saveImage(req, res);
    default:
      break;
  }
}

const getImage = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM articleimage");
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ e });
  }
};

const saveImage = async (req, res) => {
  try {
    const { url, articleId } = req.body;
    const [result] = await pool.query("INSERT INTO articleimage SET ?", {
      articleid: articleId,
      imageurl: url,
    });
    return res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
