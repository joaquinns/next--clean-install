import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { uploadImage } from "../firebase/client";

export function ArticleForm() {
  const [article, setArticle] = useState({
    articletitle: "",
    description: "",
    price: 0,
    articlecategoryid: 1,
  });

  const [image, setImage] = useState(null);
  const [articleCategories, setArticleCategories] = useState([]);

  const fileRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      articletitle: "",
      description: "",
      price: 0,
      articlecategoryid: 1,
    },
    onSubmit: (values) => handleFormSubmit(values),
  });

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
  const handleFormSubmit = async (values) => {
    console.log(values);
    // e.preventDefault();

    try {
      if (router.query.id) {
        //console.log("update");
        const res = await axios.put("/api/articles/" + router.query.id, values);
        //console.log(res);
        toast.success("Article actualitzat");
      } else {
        const res = await axios.post("/api/articles", values);
        //console.log(res);
        toast.success("Article enregistrat");
      }
      router.push("/");
    } catch (error) {
      toast.log(error.response.data.message);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    //console.log(name, value)
    setArticle({ ...article, [name]: value });
  };

  useEffect(() => {
    const getArticle = async () => {
      const { data } = await axios.get("/api/articles/" + router.query.id);
      const { data: categories } = await axios.get("/api/articles/categories");
      setArticleCategories(categories);
      setArticle(data);
    };

    if (router.query?.id) {
      //console.log(router.query.id)
      getArticle(router.query.id);
    }
  }, [router.query.id]);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 py-6 pb-8 mb-4"
      >
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
            onChange={formik.handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formik.values.articletitle}
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
            onChange={formik.handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formik.values.price}
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
            categories
          </label>
          <select
            name="categories"
            value={formik.values.articlecategoryid}
            style={{ display: "block" }}
          >
            {articleCategories.map((category) => (
              <>
                {console.log(category)}
                <option
                  key={category.articlecategoryid}
                  value={category.articlecategoryid}
                  label={category.articlecategory}
                  onChange={formik.handleChange}
                >
                  {category.articlecategory}
                </option>
              </>
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
            onChange={formik.handleChange}
            className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formik.values.description}
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
