import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Layout } from "../../components/Layout";

function ArticleView({ article }) {
  //console.log("article: ", article);

  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      //console.log(id);
      await axios.delete("/api/articles/" + id);
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout>
      <h1>{article.articletitle}</h1>
      <p>{article.description}</p>
      <p>{article.price}</p>

      <button
        className="bg-red-500 hover:bg-red-700 text-white rounded px-3 py-2"
        onClick={() => handleDelete(article.articleid)}
      >
        Elimina
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-800 text-white rounded ml-2 px-5 py-2"
        onClick={() => router.push("/articles/edit/" + article.articleid)}
      >
        Edita
      </button>
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client. Després carrega el return de HomePage
export const getServerSideProps = async (context) => {
  const { data: article } = await axios.get(
    "http://localhost:3000/api/articles/" + context.query.id
  );
  //console.log(article);

  return {
    props: {
      article,
    },
  };
};

export default ArticleView;
