import { useContext } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import "./JournalList.css";
import { UserContext } from "../../context/user.context";
import { useMemo } from "react";

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else return -1;
  };

  const filteredItems = useMemo(
    () => items.filter((el) => el.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (items.length === 0) {
    return <p>Create first note</p>;
  }

  return (
    <>
      {filteredItems.map((el) => (
        <CardButton key={el.id} onClick={() => setItem(el)}>
          <JournalItem title={el.title} post={el.post} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
