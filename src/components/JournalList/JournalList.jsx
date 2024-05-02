import { useContext } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";
import { UserContext } from "../../context/user.context";

function JournalList({ items }) {
  const { userId } = useContext(UserContext);

  if (items.length === 0) {
    return <p>Create first note</p>;
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else return -1;
  };

  return (
    <>
      {items
        .filter((el) => el.userId === userId)
        .sort(sortItems)
        .map((el) => (
          <CardButton key={el.id}>
            <JournalItem title={el.title} post={el.post} date={el.date} />
          </CardButton>
        ))}
    </>
  );
}

export default JournalList;
