import Category from "../../assets/data/room-category.json";
import "./room-category.css";

const RoomCategory = (props) => {
  const { setShowRoomList } = props;

  const onImageClick = () => {
    setShowRoomList(true);
  };

  return (
    <>
      <h2>Room Category</h2>
      <div className="cat-container">
        {Category?.map((record) => {
          return (
            <div key={record.id}>
              <img
                src={record.icon}
                key={record.id}
                alt="search room"
                className="cat-img"
                onKeyDown={onImageClick}
                onClick={onImageClick}
                tabIndex={0}
              />
              <br />
              <span className="room-type">{record.type}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RoomCategory;
