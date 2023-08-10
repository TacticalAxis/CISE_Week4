import { GetStaticProps, NextPage } from "next";

import { ArticlesInterface } from "@/lib/article";
import { loadArticles } from "@/lib/articleloader";

import SortableTable from "../../components/table/SortableTable";

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};
export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
  const articles = await loadArticles();

  // const articles = data.map((article) => ({
  //   id: article.id,
  //   title: article.title,
  //   authors: article.authors.join(", "),
  //   source: article.source,
  //   pubyear: article.pubyear,
  //   doi: article.doi,
  //   claim: article.claim,
  //   evidence: article.evidence,
  // }));

  return {
    props: {
      articles,
    },
  };
};

export default Articles;
