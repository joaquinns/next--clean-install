import axios from "axios";
import { Layout } from "../components/Layout";
import { ArticleCard } from "../components/ArticleCard";
import { HOST_SV, PORT_SV } from "../config/config";
import { useUser } from "context/authContext";

function HomePage({ articles }) {
  //console.log(articles);
  const { user } = useUser();
  console.log("user: ", user);

  /*   const renderArticles = () => {
    if (articles.length === 0)
      return (
        <h1 className="text-center text-2xl font-bold">No hi ha articles</h1>
      );

    return articles.map((article) => (
      <ArticleCard key={article.id} article={article} />
    ));
  }; */

  const renderArticles = () => {
    console.log("articles.length: ", articles.length);
    {!articles.length > 0 ? (
      <h1 className="text-center text-2xl font-bold">No hi ha articles</h1>
    ) : (
      articles.map((article) => (
        <ArticleCard key={article.articleid} article={article} />
      ))
    )}

  }


  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {renderArticles()}
      </div>
{/*       <div>
        <h1 className="text-xl">Funciona! tailwind!</h1>
      </div>
 */}      
    </Layout>
  );
}

//// Funció especial de Next per executar codi de server que s'executa abans que la pantalla es presenti en el client.
////   Després carrega el return de HomePage
export const getServerSideProps = async (context) => {

/*   const response = await fetch(HOST_SV + PORT_SV + "/api/articles");
  if (!response.ok) {
    const error = new Error("something bad happended");
    console.log(error);
  }
  const articles = await response.json();
  // console.log(data);
  console.log(articles);
 */

  const {data: articles} = await axios.get(HOST_SV + PORT_SV + "/api/articles")
  console.log(articles);

  const {data: articleCategory} = await axios.get(HOST_SV + PORT_SV + "/api/tables", {
    params: {
      table: "articleCategory"
    }
  })
  //console.log(articleCategory);
  
  const {data: articleStatus} = await axios.get(HOST_SV + PORT_SV + "/api/tables", {
    params: {
      table: "articleStatus"
    }
  })
  //console.log(articleStatus);



  return {
    props: {
      articles,
      articleCategory,
      articleStatus,
    },
  };
};

export default HomePage;
