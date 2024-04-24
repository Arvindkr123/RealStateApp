import SearchBar from "../../components/searchbar/SearchBar";
import { useAuthContext } from "../../context/Auth.Context";
import "./HomePages.scss";
function HomePage() {
  const { currentUser } = useAuthContext();
  console.log(currentUser);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Your Real Estate & Get Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            non consequatur omnis doloribus cum, quibusdam sit placeat
          </p>

          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years Of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="home page image" />
      </div>
    </div>
  );
}

export default HomePage;
