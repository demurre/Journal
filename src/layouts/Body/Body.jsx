import "./Body.css";

function Body({ children }) {
  return (
    <div className="body" data-test="body">
      {children}
    </div>
  );
}

export default Body;
