import Select from "react-select";
const options = [
  { value: "inprogress", label: "In Progress" },
  { value: "delayed", label: "Delayed" },
  { value: "completed", label: "Completed" },
];
const Combobox = ({
  optionsSelected,
  setOptionsSelected,
  taskDesribe,
  setTaskDescribe,
}) => {
  const handleSelection = (e) => {
    setOptionsSelected(e.value);
    setTaskDescribe({
      ...taskDesribe,
      taskProgress: e.value,
    });
  };
  return (
    <>
      <Select
        options={options}
        onChange={handleSelection}
        value={options.filter(function (s) {
          return s.value === optionsSelected;
        })}
        label="Progress"
      />
    </>
  );
};

export default Combobox;
