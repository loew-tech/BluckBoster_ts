import "./App.css";
import { CookieConsent } from "./components/login/CookieConsent";
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
