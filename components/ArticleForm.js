import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { uploadImage } from "../firebase/client";
import { getDownloadURL } from "firebase/storage";
import { useUser } from "context/authContext";

export function ArticleForm({ articleUpdateId = null }) {
  const [urlImg, setUrlImg] = useState("");
  const [updateArticle, setUpdateArticle] = useState({
    articletitle: "",
    price: "",
    description: "",
  });
  const router = useRouter();
  const { user } = useUser();

  /*   const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    const uploadedImage = uploadImage(event.target.files[0]);
  }; */

  const handleUpload = (file) => {
    const { uploadTask } = uploadImage(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      // si hay error lo ejecutamos
      (err) => console.log(err),
      // si todo fue ok hacemos un callback con una promesa recuperando la url y la seteamos al estado
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(setUrlImg);
      }
    );
  };

  useEffect(() => {
    if (articleUpdateId !== null) {
      axios
        .get(`http://localhost:3000/api/articles/${articleUpdateId}`)
        .then((res) => {
          setUpdateArticle({
            articletitle: res.data.articletitle,
            description: res.data.description,
            price: res.data.price,
          });
        });
    }
  }, [articleUpdateId]);

  return (
    <div className="w-full max-w-xs">
      <Formik
        initialValues={{
          articletitle: articleUpdateId ? updateArticle.articletitle : "",
          price: articleUpdateId ? updateArticle.price : 0,
          description: articleUpdateId ? updateArticle.description : "",
        }}
        validationSchema={
          new yup.ObjectSchema({
            articletitle: yup.string().required("Title is required"),
            price: yup.number().required("Price is required"),
            description: yup.string().required("Description is required"),
          })
        }
        onSubmit={async (values, actions) => {
          if (articleUpdateId !== null) {
            await axios.put(
              `http://localhost:3000/api/articles/${articleUpdateId}`,
              {
                ...values,
                useremail: `${user.email}`,
              }
            );
            router.push("/");
          }
          return axios
            .post("http://localhost:3000/api/articles", {
              ...values,
              useremail: `${user.email}`,
            })
            .then((response) => {
              return axios
                .post("http://localhost:3000/api/articles/image", {
                  articleId: response.data.articleid,
                  url: urlImg,
                })
                .catch((e) => console.error(e));
            })
            .catch((e) => console.log(e));
        }}
        enableReinitialize
      >
        {({ handleSubmit, setFieldValue }) => (
          <Form
            onSubmit={handleSubmit}
            /* onSubmit={formik.handleSubmit} */
            className="bg-white shadow-md rounded px-8 py-6 pb-8 mb-4"
          >
            {articleUpdateId ? (
              <h1 className="mb-4 text-3xl font-bold">Editar</h1>
            ) : (
              <h1 className="mb-4 text-3xl font-bold">Crear</h1>
            )}

            <div className="mb-4">
              <label
                htmlFor="articletitle"
                className="block text-gray-700 text-sm font-blod mb-2"
              >
                Article:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="articletitle"
              />
              <Field
                type="text"
                name="articletitle"
                /* onChange={formik.handleChange} */
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                /* value={formik.values.articletitle} */
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 text-sm font-blod mb-2"
              >
                Preu:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="price"
              />
              <Field
                name="price"
                type="number"

                /* onChange={formik.handleChange} */
                /* value={formik.values.price} */
              />
            </div>

            {/*           <button
            onClick={(e) => {
              e.preventDefault();
              fileRef.current.click();
            }}
          >
            Upload File
          </button> */}

            <div className="mb-4">
              <input
                type="file"
                name="imageUrl"
                onChange={(e) =>
                  setFieldValue("imageUrl", handleUpload(e.target.files[0]))
                }
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-blod mb-2"
              >
                Descripci??:
              </label>
              <ErrorMessage
                component="p"
                className="text-xl text-left text-red-500"
                name="description"
              />
              <Field
                as="textarea"
                name="description"
                rows="2"
                /* onChange={formik.handleChange} */
                className="shadow appereance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                /* value={formik.values.description} */
              ></Field>
            </div>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
            >
              {articleUpdateId ? "Editar" : "Crear"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
