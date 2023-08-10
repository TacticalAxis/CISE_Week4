import { FormEvent, useState } from "react";
import axios from "axios";
import router from "next/router";
import formStyles from "../../../styles/Form.module.scss";
import dummyData from "../../utils/dummydata";

const NewDiscussion = () => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [source, setSource] = useState("");
  const [pubYear, setPubYear] = useState<number>(0);
  const [doi, setDoi] = useState("");
  const [summary, setSummary] = useState("");
  const [claim, setClaim] = useState("");
  const [evidence, setEvidence] = useState("");
  const [linkedDiscussion, setLinkedDiscussion] = useState("");

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

  const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const strPubYear = pubYear.toString();

    const newArticle = {
      title,
      authors,
      source,
      publicationYear: strPubYear,
      doi,
      claim,
      evidence,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/researchPapers`,
        newArticle
      );

      // reset the form
      setTitle("");
      setAuthors([]);
      setSource("");
      setPubYear(0);
      setDoi("");
      setClaim("");
      setEvidence("");

      // redirect to the articles page
      router.push("/articles");
    } catch (error) {
      // show an alert if there is an error
      alert(error);
    }
  };

  // Some helper methods for the authors array
  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const changeAuthor = (index: number, value: string) => {
    setAuthors(
      authors.map((oldValue, i) => {
        return index === i ? value : oldValue;
      })
    );
  };

  // Return the full form
  return (
    <div className="container">
      <h1>New Article</h1>
      <button onClick={resetToDefaultArticles} type="button">
        Reset Articles
      </button>
      <form className={formStyles.form} onSubmit={submitNewArticle}>
        <label htmlFor="title">Title:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="author">Authors:</label>
        {authors.map((author, index) => {
          return (
            <div key={`author ${index}`} className={formStyles.arrayItem}>
              <input
                type="text"
                name="author"
                value={author}
                onChange={(event) => changeAuthor(index, event.target.value)}
                className={formStyles.formItem}
              />
              <button
                onClick={() => removeAuthor(index)}
                className={formStyles.buttonItem}
                style={{ marginLeft: "3rem" }}
                type="button"
              >
                -
              </button>
            </div>
          );
        })}
        <button
          onClick={() => addAuthor()}
          className={formStyles.buttonItem}
          style={{ marginLeft: "auto" }}
          type="button"
        >
          +
        </button>
        <label htmlFor="source">Source:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="source"
          id="source"
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
          }}
        />
        <label htmlFor="pubYear">Publication Year:</label>
        <input
          className={formStyles.formItem}
          type="number"
          name="pubYear"
          id="pubYear"
          value={pubYear}
          onChange={(event) => {
            const val = event.target.value;
            if (val === "") {
              setPubYear(0);
            } else {
              setPubYear(parseInt(val));
            }
          }}
        />
        <label htmlFor="doi">DOI:</label>
        <input
          className={formStyles.formItem}
          type="text"
          name="doi"
          id="doi"
          value={doi}
          onChange={(event) => {
            setDoi(event.target.value);
          }}
        />
        <label htmlFor="claim">Claim:</label> {/* Added claim input */}
        <textarea
          className={formStyles.formTextArea}
          name="claim"
          value={claim}
          onChange={(event) => setClaim(event.target.value)}
        />
        <label htmlFor="evidence">Evidence:</label> {/* Added evidence input */}
        <textarea
          className={formStyles.formTextArea}
          name="evidence"
          value={evidence}
          onChange={(event) => setEvidence(event.target.value)}
        />
        <button className={formStyles.formItem} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewDiscussion;
