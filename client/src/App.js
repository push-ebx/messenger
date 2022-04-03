import './styles/app.css'
import Chat from "./components/Chat";
import Companation from "./components/Companation";
import ChatsPanel from "./components/ChatsPanel";
import Search from "./components/Search";

function App() {
  return (
      <div className="App">
        <div className="main">
          <div className="left">
            <Search/>
            <ChatsPanel/>
          </div>
          <div className="right">
            <Companation/>
            <Chat className="chat"/>
          </div>
        </div>
      </div>
  );
}
export default App;
