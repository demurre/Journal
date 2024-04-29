import { useState } from "react";
import "./JournalForm.css";
import Button from "../Button/Button";

function JournalForm() {
  const [inputData, setInputData] = useState("");

  const inputChange = (e) => {
    setInputData(e.target.value);
    console.log(inputData);
  };

  const addJournalItem = (e) => {
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    e.preventDefault();
    console.log(formProps);
  };

  return (
    <>
      <form className="journal-form" onSubmit={addJournalItem}>
        <input type="text" name="title" />
        <input type="date" name="date" />
        <input
          type="text"
          name="tag"
          value={inputData}
          onChange={inputChange}
        />
        <textarea name="post"></textarea>
        <Button
          text="Save"
          onClick={() => {
            console.log("click");
          }}
        />
      </form>
    </>
  );
}

export default JournalForm;
