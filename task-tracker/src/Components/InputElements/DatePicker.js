import DatePicker from "react-date-picker";
import moment from "moment";
const DateElement = ({ taskDesribe, setTaskDescribe }) => {
  return (
    <DatePicker
      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 "
      onChange={(e) => {
        setTaskDescribe({
          ...taskDesribe,
          taskDueDate: e,
        });
      }}
      value={taskDesribe.taskDueDate}
      minDate={moment().toDate()}
    />
  );
};

export default DateElement;
