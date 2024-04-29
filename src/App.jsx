import "./App.css";
import Button from "./components/Button/Button";
import CardButton from "./components/CardButton/CardButton";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalItem from "./components/JournalItem/JournalItem";
import JournalList from "./components/JournalList/JournalList";
import Body from "./Layouts/Body/Body";
import LeftPanel from "./Layouts/LeftPanel/LeftPanel";

function App() {
  const data = [
    { title: "abc1", text: "abc1", date: new Date() },
    { title: "abc2", text: "abc2", date: new Date() },
  ];
  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          <CardButton>
            <JournalItem
              title={data[0].title}
              text={data[0].text}
              date={data[0].date}
            />
          </CardButton>
          <CardButton>
            <JournalItem
              title={data[1].title}
              text={data[1].text}
              date={data[1].date}
            />
          </CardButton>
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm />
      </Body>
    </div>
  );
}

export default App;
