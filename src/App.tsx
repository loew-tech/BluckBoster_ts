import "./App.css";
import { CookieConsent } from "./components/CookieConsent";
import { Main } from "./pages/main";

function App() {
  return (
    <div className="App">
      <Main />
       <CookieConsent />
    </div>
  );
}

export default App;
