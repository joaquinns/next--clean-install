import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

export default function ArticleList({ articles }) {
  return (
    <div className="flex gap-4 flex-col w-full">
      {articles.map((article) => (
        <div
          className="flex justify-between border-gray-200 border-b pb-2 px-2 gap-6 transition-all duration-200 hover:bg-white"
          key={article.articleid}
        >
          <div className="flex items-center">
            <div className="rounded">
              {article && article.imageurl && (
                <Image
                  src={article.imageurl}
                  width={200}
                  height={200}
                  objectFit="cover"
                  className="max-w-full h-auto rounded-lg transition-shadow ease-in-out shadow-none"
                  alt="image of the article"
                />
              )}
            </div>

            <div className="flex flex-col justify-center items-center py-4 px-8">
              <h1 className="textl-lg font-semibold text-gray-900">
                {article.articletitle}
              </h1>
              <p className="text-sm font-semibold text-gray-500">
                {article.description}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center py-4 px-8">
              <h1 className="textl-lg font-semibold text-gray-900">Price</h1>
              <h2 className="text-xl font-bold">{article.price}€</h2>
            </div>

            <div className="flex flex-col justify-center items-center py-4 px-8">
              <h1 className="text-lg font-semibold">
                {article.publicationstatus}
              </h1>
            </div>

            <div className="flex flex-col justify-center items-center py-4 px-8">
              <h1 className="text-lg font-semibold">Modificado</h1>
              <h2 className="font-bold text-gray-500">to/do/fecha</h2>
            </div>
          </div>

          <div className="flex gap-4 justify-center items-center">
            <button className="px-2 py-2 rounded font-bold text-gray-700 hover:bg-gray-400 hover:text-white transition-all duration-200">
              <FiEdit3 size={22} />
            </button>
            <button className="px-2 py-2 rounded font-bold text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-200">
              <AiFillDelete size={22} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}