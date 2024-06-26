
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Cart from "./Pages/Cart";
import Collection from "./Pages/Collection";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Men from "./Pages/Men";
import Registration from "./Pages/Registration";
import Sale from "./Pages/Sale";
import Women from "./Pages/Women";
function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Collection />
      <Men />
      <Women />
      <Sale />
      <Cart />
      <Registration />
      <Login />
      <Contact />
    </div>
  );
}

export default App;
