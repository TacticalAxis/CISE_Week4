import axios from "axios";
import router from "next/router";
import dummyData from "../../utils/testdata";

import SubmissionForm from "../../components/SubmissionForm";

const NewDiscussion = () => {
  const resetToDefaultArticles = async () => {
    try {
      // Delete all existing articles
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/researchPapers`);

      // Loop through the dummy data and post each article
      for (const article of dummyData) {
        const newArticle = {
          title: article.title,
          authors: article.authors.split(", "),
          source: article.source || "N/A", // If there is no source, use "N/A"
          publicationYear: article.pubyear.toString() || "N/A", // If there is no publication year, use "N/A"
          doi: article.doi || "N/A", // If there is no DOI, use "N/A"
          claim: article.claim || "N/A", // If there is no claim, use "N/A"
          evidence: article.evidence || "N/A", // If there is no evidence, use "N/A"
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/researchPapers`,
          newArticle
        );
      }

      // You can navigate or refresh the data here as needed
      alert("Default articles added successfully!");

      // Redirect to articles page
      router.push("/articles");
    } catch (error) {
      alert("An error occurred while adding default articles: " + error);
    }
  };

  return (
    <div className="container">
      <h1>New Article</h1>
      <button onClick={resetToDefaultArticles} type="button">
        Reset Articles
      </button>
      <SubmissionForm />
    </div>
  );
};

export default NewDiscussion;
