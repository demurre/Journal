import "./Button.css";

const Button = ({ text, onClick }) => (
  <button className="button accent" onClick={onClick}>
    {text}
  </button>
);

export default Button;
