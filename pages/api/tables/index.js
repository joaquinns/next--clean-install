import {pool} from '../../../config/db'


export default async function handler(req, res) {
  
  //console.log("req.query.table: ", req.query.table)

  switch (req.query.table) {
    case "articleCategory":
      return await getArticleCategory(req, res);

    case "articleStatus":
      return await getArticleStatus(req, res);
  
    default:
      break;
  }

};


const getArticleCategory = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM articlecategory");
    //console.log(result);
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};

const getArticleStatus = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM articlestatus");
    return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({error});
  }
};


