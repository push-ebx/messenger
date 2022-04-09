import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Row} from "react-bootstrap";
import GlassInput from "./components/UI/glassInput/GlassInput";
import Message from "./components/Message/Message";
import Chat from "./components/Chat";

function App() {
  return (
      <div className="App">
        <div className="container-lg container-fluid">
          <Row className="px-md-5" style={{height: '100vh'}}>
            <Col md={4} style={{height: '100%', padding: '1vh 0'}} className="d-none d-lg-block">
              <Col className="glass" style={{height: '20%', marginRight: '1vh'}}>Поиск</Col>
              <Col className="glass" style={{height: '79%', marginTop: '1vh', marginRight: '1vh'}}>Сообщения</Col>
            </Col>
            <Chat/>
          </Row>
        </div>
      </div>
  );
}

export default App;
