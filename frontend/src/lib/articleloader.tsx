import { ArticlesInterface } from "./article";

export async function loadArticles(): Promise<ArticlesInterface[]> {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/researchPapers`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  // You can modify the following logic based on the structure of your response data
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
