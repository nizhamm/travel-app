import { useState } from "react";
import landscape from "../../assets/landscape.png";
import "./home.css";
import "react-datepicker/dist/react-datepicker.css";
import RoomCategory from "../pages/room-category";
import RoomList from "../pages/room-list";
import RoomSearch from "../pages/room-search";
import Green from "../../assets/green.jpg";
import Wallet from "../../assets/wallet.jpg";
import Gogreen from "../../assets/go-green.png";

const Home = () => {
  const [showRoomCategory, setShowRoomCategory] = useState(false);
  const [showRoomList, setShowRoomList] = useState(false);

  return (
    <>
      <div>
        <img src={landscape} alt="landscape" className="landscape"></img>
      </div>
      <RoomSearch setShowRoomCategory={setShowRoomCategory} />
      {!showRoomCategory && !showRoomList && (
        <div className="body-container">
          <h3 className="head-go">Go further with the Rtravel</h3>
          <span>
            Save on select hotels and earn reward points when you book on the
            website. Our wesbite deals help you to save on trips so you can
            travel more and manage it all on the go.
          </span>
          <p className="go-green">
            Driving an electric vehicle can help you reduce your carbon
            footprint. You can reduce the environmental impact of charging your
            vehicle further by choosing renewable energy options for home
            electricity.
          </p>

          <div className="container">
            <div className="row">
              <div className="col">
                {" "}
                <img src={Green} alt="green" className="green-img" />
              </div>
              <div className="col">
                <img src={Gogreen} alt="green" className="gogreen-img" />
              </div>
              <div className="col">
                <img src={Wallet} alt="wallet" className="wallet-img" />
              </div>
            </div>
          </div>
        </div>
      )}
      {showRoomCategory && <RoomCategory setShowRoomList={setShowRoomList} />}
      {showRoomList && <RoomList />}
    </>
  );
};

export default Home;
