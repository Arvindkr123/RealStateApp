import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card.jsx";
import { listData } from "../../lib/DummyData";
import "./listPage.scss";
import Map from "../../components/map/Map.jsx";
const ListPage = () => {
  const data = listData;
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {/* map list of data */}
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={data} />
      </div>
    </div>
  );
};

export default ListPage;
