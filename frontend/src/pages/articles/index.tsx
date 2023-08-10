import React, { useState, useEffect } from "react";
import axios from "axios";

import { ArticlesInterface } from "../../lib/article";
import SortableTable from "../../components/table/SortableTable";

const Articles = () => {
  const [articles, setArticles] = useState<ArticlesInterface[]>([]);
  
  useEffect(() => {
    // Define the function to load articles
    const loadArticles = async () => {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/researchPapers`;
      const response = await axios.get(apiUrl);
      const data: ArticlesInterface[] = response.data.map((article: any) => ({
        id: article.id ?? article._id,
        title: article.title,
        authors: article.authors.join(", "),
        source: article.source,
        pubyear: String(article.publicationYear),
        doi: article.doi,
        claim: article.claim,
        evidence: article.evidence,
      }));

      setArticles(data);
    };

    // Call the function to load articles
    loadArticles();
  }, []); // The empty array means this effect will run once, similar to componentDidMount

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

export default Articles;
