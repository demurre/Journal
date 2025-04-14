import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const postRef = useRef();
  const dateRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId },
      });
    }
    dispatchForm({
      type: "SET_VALUE",
      payload: { ...data },
    });
  }, [data, userId]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId },
      });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId },
    });
  }, [userId]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
    dispatchForm({ type: "SET_VALUE", payload: { userId } });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className={styles["form-row"]}>
        <Input
          type="text"
          ref={titleRef}
          isValid={isValid.title}
          onChange={onChange}
          value={values.title}
          name="title"
          appearence="title"
          placeholder="Enter title"
          id="title"
        />
        {data?.id && (
          <button
            className={styles["delete"]}
            type="button"
            onClick={() => deleteJournalItem()}
            id="delete-button"
          >
            <img src="/archive.svg" alt="delete" />
          </button>
        )}
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-lable"]}>
          <img src="/calendar.svg" alt="calendar" />
          <span>Date</span>
        </label>
        <Input
          type="date"
          ref={dateRef}
          isValid={isValid.date}
          onChange={onChange}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          name="date"
          id="date"
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-lable"]}>
          <img src="/folder.svg" alt="folder" />
          <span>Marks</span>
        </label>
        <Input
          type="text"
          onChange={onChange}
          value={values.tag}
          name="tag"
          id="tag"
          placeholder="Add mark"
        />
      </div>

      <textarea
        name="post"
        ref={postRef}
        id="form_textarea"
        onChange={onChange}
        value={values.post}
        cols="30"
        rows="10"
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.post,
        })}
        placeholder="Write a note"
      ></textarea>
      <Button>Save</Button>
    </form>
  );
}

export default JournalForm;
