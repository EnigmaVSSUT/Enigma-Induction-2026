import Landing from "./Components/Landing";
import Team from "./Components/Team";
import Navbar from "./Components/Navbar";
import Projects from "./Components/Projects";
import Blogs from "./Components/Blogs";
import Contact from "./Components/Contact";

const App = () => {
  return (
    <>
      <Navbar />

      <div id="home">
        <Landing />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="projects"><Projects /></div>
      <div id="blogs"><Blogs /></div>
      <div id="contact"><Contact /></div>
    </>
  )
}

export default App