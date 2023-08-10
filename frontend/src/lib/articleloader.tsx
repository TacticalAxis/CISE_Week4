import axios from "axios";
import { ArticlesInterface } from "./article";

export async function loadArticles(): Promise<ArticlesInterface[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/researchPapers`;

  // Making a GET request using axios
  const response = await axios.get(apiUrl);
  const data = response.data;

  // Mapping the response to match the ArticlesInterface structure
  const articles: ArticlesInterface[] = data.map((article: any) => ({
    id: article.id ?? article._id,
    title: article.title,
    authors: article.authors.join(", "),
    source: article.source,
    pubyear: String(article.publicationYear),
    doi: article.doi,
    claim: article.claim,
    evidence: article.evidence,
  }));

  return articles;
}
