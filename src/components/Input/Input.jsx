import { forwardRef, useMemo } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

const Input = forwardRef(function Input(
  { className, isValid = true, appearence, ...props },
  ref
) {
  const inputStyles = useMemo(
    () =>
      cn(className, styles["input"], {
        [styles["invalid"]]: !isValid,
        [styles["input-title"]]: appearence === "title",
      }),
    [className, isValid, appearence]
  );

  return <input {...props} ref={ref} className={inputStyles} />;
});

export default Input;
