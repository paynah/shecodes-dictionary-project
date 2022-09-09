import './App.css';
import Dictionary from "./Dictionary";
import bgImg from "./images/bg.jpg";

export default function App() {
  return (
    <div className="App" style={{ 
      backgroundImage: `url(${bgImg})`,
      height: `100vh`,
      overflowY: `scroll`
    }}>
        <Dictionary />
        
        <footer className="credential mb-3 fw-light">
          <a href="https://github.com/paynah/shecodes-dictionary-project">Open source code</a> by Nancy Yu <br/>
          <a href="https://www.pexels.com">Photos provided by Pexels</a><br/>
          <a href="https://www.flaticon.com/free-icons/owl" title="owl icons">Owl icons created by cube29 - Flaticon</a>
        </footer>
    </div>
  );
}
