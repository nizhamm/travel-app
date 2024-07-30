import { useEffect, useState } from "react";
import _ from "lodash";
import CreatableSelect from "react-select/creatable";
import DatePicker from "react-datepicker";
import { stateOptions } from "../../assets/data/dropdown-data";
import "./room-search.css";
import "react-datepicker/dist/react-datepicker.css";

const RoomSearch = (props) => {
  const { setShowRoomCategory } = props;
  const [travelData, setTravelData] = useState({
    selectedePlace: "",
    selectedStartDate: null,
    selectedEndDate: null,
    selectedPerson: "",
    selectedRoom: "",
  });
  const [choosePlace, setChoosenPlace] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [numberOfPerson, setNumberOfPerson] = useState();
  const [numberOfRoom, setNumberOfRoom] = useState();
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    setTravelData({
      selectedePlace: choosePlace,
      selectedStartDate: startDate,
      selectedEndDate: endDate,
      selectedPerson: numberOfPerson,
      selectedRoom: numberOfRoom,
    });
  }, [choosePlace, startDate, endDate, numberOfPerson, numberOfRoom]);

  useEffect(() => {
    const {
      selectedePlace,
      selectedStartDate,
      selectedEndDate,
      selectedPerson,
      selectedRoom,
    } = travelData;

    if (
      !_.isUndefined(selectedePlace && selectedStartDate && selectedEndDate) &&
      !_.isEmpty(selectedPerson && selectedRoom)
    ) {
      setBtnDisabled(false);
      sessionStorage.setItem("userSelection", JSON.stringify(travelData));
    } else setBtnDisabled(true);
    console.log("testDta", travelData.selectedPerson);
  }, [travelData, travelData.selectedPerson, travelData.selectedRoom]);

  const submitData = (e) => {
    setShowRoomCategory(true);
  };

  return (
    <>
      <div className="card-style">
        <div className="card-body">
          <form className="form-style">
            <CreatableSelect
              className="form-formatting"
              options={stateOptions}
              // isClearable
              onChange={(val) => setChoosenPlace(val?.label)}
            />
            <DatePicker
              className="date-style"
              showIcon
              icon="fa fa-calendar"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd-MMM-yyyy"
              startDate={new Date()}
              minDate={new Date()}
              placeholderText="Select start date"
            />
            <DatePicker
              className="date-style"
              showIcon
              icon="fa fa-calendar"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd-MMM-yyyy"
              startDate={startDate}
              minDate={startDate}
              placeholderText="Select end date"
            />
            <input
              type="number"
              className="form-control number-person"
              id="number of person"
              aria-describedby="number of person"
              placeholder="Enter No. of person"
              min={1}
              onChange={(e) => setNumberOfPerson(e.target.value)}
            />
            <input
              type="number"
              className="form-control number-rooms"
              id="number of rooms"
              aria-describedby="number of rooms"
              placeholder="# of rooms "
              min={1}
              onChange={(e) => setNumberOfRoom(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary go-btn"
              onClick={submitData}
              disabled={btnDisabled}
            >
              Go
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RoomSearch;
