import "./card.scss";
import { Link } from "react-router-dom";
function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imgContainer">
        <img src={item.images[0]} alt={item.title} />
      </Link>
      <div className="txtContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="bed image" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="bath image" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="save image" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="chat image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
