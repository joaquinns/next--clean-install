import Link from "next/link";

export function ArticleCard({article}) {
  return (
    <Link href={`/articles/${article.articleid}`} key={article.articleid}>
    <a>
      <div  className="border border-gray-200 shadow-md p-6">
        <h1>{article.articletitle}</h1>

        <p>{article.articlecategory}</p>
        <p>{article.description}</p>
        <p>{article.articlestatus}</p>
        <p>{article.course}</p>
        <p>{article.location}</p>
        <p>{article.publicationstatus}</p>
        <p>{article.salestatus}</p>
        <p>{article.price} €</p>

        <div className="flex flex-wrap justify-center">
          <img
          src={article.imageurl}
          className="max-w-full h-auto rounded-lg transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
          alt="..."
        />
        </div>

      </div>
    </a>
  </Link>
)
}
