import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//import { useFormik } from "formik";

import { uploadImage } from "../firebase/client";
import { HOST_SV, PORT_SV } from "config/config";

export function ArticleForm() {
  let isAddMode = true;

  const [article, setArticle] = useState({
    articletitle: "",
    description: "",
    articlecategoryid: "",
    articlestatusid: "",
    price: 0,
  });

  const [image, setImage] = useState(null);
  const [articleCategories, setArticleCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState([]);
  const [articleStatus, setArticleStatus] = useState([]);

  const fileRef = useRef(null);

  /*   const formik = useFormik({
    initialValues: {
      articletitle: "",
      description: "",
      articlecategoryid: "",
      articlestatusid: "",
      price: 0,
    },
    onSubmit: (values) => handleFormSubmit(values),
  });
 */

  const router = useRouter();

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    const uploadedImage = uploadImage(event.target.files[0]);
  };

  /*   const handleFileUploadButton = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };
 */

  const handleFormSubmit = async (e) => {
    //toast.success("Hola handleFormSubmit");
    //console.log("handleFormSubmit/e", e);
    e.preventDefault();

    try {
      //console.log("handleFormSubmit/try");
      //toast.success("Hola handleFormSubmit/try");
      if (router.query.id) {
        //console.log("update");
        /* const res = await axios.put("/api/articles/" + router.query.id, values); */
        const res = await axios.put(
          "/api/articles/" + router.query.id,
          article
        );
        //console.log("update/res: ", res);
        toast.success("Article actualitzat");
      } else {
        console.log("add");
        console.log("add/article: ", article);
        /* const res = await axios.post("/api/articles", values); */
        const res = await axios.post("/api/articles", article);
        //console.log("add/res: ", res);
        toast.success("Article enregistrat");
      }
      router.push("/");
    } catch (error) {
      toast.log(error.response.data.message);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    console.log(name, value);
    setArticle({ ...article, [name]: value });
  };

  const getTables = async () => {
    //console.log("getTables")
    const { data: articleCategory } = await axios.get(
      HOST_SV + PORT_SV + "/api/tables",
      {
        params: {
          table: "articleCategory",
        },
      }
    );
    //console.log("articleCategory: ", articleCategory);
    setArticleCategory(articleCategory);

    const { data: articleStatus } = await axios.get(
      HOST_SV + PORT_SV + "/api/tables",
      {
        params: {
          table: "articleStatus",
        },
      }
    );
    //console.log("articleStatus: ", articleStatus);
    setArticleStatus(articleStatus);
  };

  useEffect(() => {
    //console.log("useEffect");
    ////TODO: cambiar esto. No hace falta que vuelva a cargar tablas cada vez que hay un cambio en state!!!
    getTables();

    const getArticle = async () => {
      const { data } = await axios.get("/api/articles/" + router.query.id);
      setArticle(data);
      console.log("getArticle/data: ", data);
      //const { data: categories } = await axios.get("/api/articles/categories");
      //setArticleCategories(categories);
    };

    if (router.query?.id) {
      isAddMode = false;
      console.log("useEffect/router.query.id: ", router.query.id);
      getArticle(router.query.id);
    }
  }, [router.query.id]);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleFormSubmit}
        /* onSubmit={formik.handleSubmit} */
        className="bg-white shadow-md rounded px-8 py-6 pb-8 mb-4"
      >
        <h1 className="mb-4 text-3xl font-bold">
          {isAddMode ? "Afegir Article" : "Editar Article"}
        </h1>

        <div className="mb-4">
          <label
            htmlFor="articletitle"
            className="block text-gray-700 text-sm font-blod mb-2"
          >
            Article:
          </label>
          <input
            type="text"
            name="articletitle"
            /* onChange={formik.handleChange} */
            onChange={handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /* value={formik.values.articletitle} */
            value={article.articletitle}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-blod mb-2"
          >
            Preu:
          </label>
          <input
            type="text"
            name="price"
            id="price"
            /* onChange={formik.handleChange} */
            onChange={handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /* value={formik.values.price} */
            value={article.price}
          />
        </div>

        <div className="mb-4">
          <input
            ref={fileRef}
            type="file"
            accept="images/*"
            onChange={handleFileUpload}
            // style={{ display: "none" }}
            multiple={false}
          />
          {/*           <button
            onClick={(e) => {
              e.preventDefault();
              fileRef.current.click();
            }}
          >
            Upload File
          </button> */}
        </div>

        <div className="mb-4">
          <label htmlFor="articlecategoryid" style={{ display: "block" }}>
            Categoria
          </label>
          <select
            /* name="categories" */
            name="articlecategoryid"
            /* value={formik.values.articlecategoryid} */
            value={article.articlecategoryid}
            /* onChange={formik.handleChange} */
            onChange={handleChange}
            style={{ display: "block" }}
          >
            {/* {articleCategories.map((category) => ( */}
            {articleCategory.map((category) => (
              <option
                key={category.articlecategoryid}
                value={category.articlecategoryid}
                label={category.articlecategory}
              >
                {category.articlecategory}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-blod mb-2"
          >
            Descripció:
          </label>
          <textarea
            name="description"
            rows="2"
            /* onChange={formik.handleChange} */
            onChange={handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /* value={formik.values.description} */
            value={article.description}
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        >
          {router.query.id ? "Editar article" : "Crear article"}
        </button>
      </form>
    </div>
  );
}
