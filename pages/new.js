import { Layout } from "../components/Layout";
import { ArticleForm } from "../components/ArticleForm";
import { useRouter } from "next/router";

function NewPage() {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <Layout>
      <div className="grid place-items-center bg-5/6">
        <ArticleForm articleUpdateId={id} />
      </div>
    </Layout>
  );
}

export default NewPage;
