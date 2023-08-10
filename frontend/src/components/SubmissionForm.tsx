import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import router from "next/router";
import formStyles from "../../styles/Form.module.scss";

export default function SubmissionForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [authors, setAuthors] = useState<string[]>([""]);

  // Some helper methods for the authors array
  const addAuthor = () => {
    setAuthors(authors.concat([""]));
  };

  const removeAuthor = (index: number) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const changeAuthor = (index: number, value: string) => {
    const newAuthors = authors.map((oldValue, i) => {
      return index === i ? value : oldValue;
    });
    setAuthors(newAuthors);
    setValue("authors", newAuthors.join(", ")); // Update the value in the form as well
  };

  const onSubmit = async (data: any) => {
    const newArticle = {
      title: data.title,
      authors: data.authors.split(", "),
      source: data.source || "N/A",
      publicationYear: data.pubyear.toString() || "N/A",
      doi: data.doi || "N/A",
      claim: data.claim || "N/A",
      evidence: data.evidence || "N/A",
      linkedDiscussion: data.linked_discussion || "N/A",
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/researchPapers`,
        newArticle
      );

      // redirect to the articles page
      router.push("/articles");
    } catch (error) {
      // show an alert if there is an error
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
      <input
        {...register("title")}
        placeholder="Title"
        className={formStyles.formItem}
      />
      <br />
      <label htmlFor="authors" className={formStyles.formLabel}>
        Authors:
      </label>
      {authors.map((author, index) => {
        return (
          <div key={`author ${index}`} className={formStyles.arrayItem}>
            <input
              type="text"
              name="authors"
              value={author}
              onChange={(event) => changeAuthor(index, event.target.value)}
              placeholder="Author"
              className={formStyles.formItem}
            />
            <button
              onClick={() => removeAuthor(index)}
              type="button"
              className={formStyles.buttonItem}
            >
              -
            </button>
          </div>
        );
      })}
      <button
        onClick={addAuthor}
        type="button"
        className={formStyles.buttonItem}
      >
        +
      </button>

      <br />
      <label htmlFor="source" className={formStyles.formLabel}>
        Source:
      </label>
      <input
        {...register("source")}
        placeholder="Source"
        className={formStyles.formItem}
      />

      <br />
      <label htmlFor="pubyear" className={formStyles.formLabel}>
        Publication Year:
      </label>
      <input
        {...register("pubyear")}
        placeholder="Publication Year"
        className={formStyles.formItem}
      />

      <br />
      <label htmlFor="doi" className={formStyles.formLabel}>
        DOI:
      </label>
      <input
        {...register("doi")}
        placeholder="DOI"
        className={formStyles.formItem}
      />

      <br />
      <label htmlFor="claim" className={formStyles.formLabel}>
        Claim:
      </label>
      <textarea
        {...register("claim")}
        placeholder="Claim"
        className={formStyles.formItem}
      />

      <br />
      <label htmlFor="evidence" className={formStyles.formLabel}>
        Evidence:
      </label>
      <textarea
        {...register("evidence")}
        placeholder="Evidence"
        className={formStyles.formItem}
      />

      <br />
      <label htmlFor="linked_discussion" className={formStyles.formLabel}>
        Linked Discussion:
      </label>
      <select
        {...register("linked_discussion")}
        className={formStyles.formItem}
      >
        <option value="">Select SE practice...</option>
        <option value="TDD">TDD</option>
        <option value="Mob Programming">Mob Programming</option>
      </select>

      <input type="submit" className={formStyles.buttonItem} />
    </form>
  );
}
