import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../Input/Input";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit }) {
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
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

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
        />
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
          value={values.date}
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
      ></textarea>
      <Button text="Save" />
    </form>
  );
}

export default JournalForm;
