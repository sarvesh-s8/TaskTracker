const TextField = ({ taskDesribe, setTaskDescribe }) => {
  return (
    <>
      <label
        htmlFor="text"
        className="block text-sm font-semibold text-violet-900"
      >
        Task Title
      </label>

      <input
        type="text"
        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        name="taskTitle"
        value={taskDesribe.taskTitle}
        onChange={(e) =>
          setTaskDescribe({
            ...taskDesribe,
            [e.target.name]: e.target.value,
          })
        }
      />
    </>
  );
};

export default TextField;
