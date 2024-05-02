import "./Button.css";

const Button = ({ children, onClick }) => (
  <button className="button accent" onClick={onClick}>
    {children}
  </button>
);

export default Button;
