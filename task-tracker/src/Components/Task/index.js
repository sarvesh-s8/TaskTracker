import Moment from "react-moment";

const Task = ({
  tasks,
  deleteData,
  setShow,
  setModalType,
  setSelectedTask,
  setId,
  setIndex,
  bgColor,
}) => {
  return (
    <div className={`${bgColor}`}>
      <h2 className="text-center mb-2 text-3xl">Task Manager</h2>

      {tasks ? (
        <div>
          {tasks.map((e, i) => (
            <div key={e._id} className="w-4/5 container mx-auto lg:w-3/5">
              <div className="block mb-3 rounded-lg bg-white p-6 bg-stone-400">
                <div className="flex justify-between">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-stone-900">
                    {e.taskTitle}
                  </h5>

                  <>
                    <div className="font-normal leading-none max-w-full flex-initial text-stone-900">
                      {e.taskProgress}
                      <div className="mt-2 text-pink-900">
                        <Moment format="MMMM DD YYYY" date={e.taskDueDate} />
                      </div>
                    </div>
                  </>
                </div>
                <div className="mt-2 mb-2 border-t-4 border-indigo-500">
                  <p>Description - {e?.taskDescription}</p>
                </div>

                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={() => {
                      setShow(true);
                      setModalType("Edit");
                      setSelectedTask(tasks.filter((a) => a._id === e._id));
                      setId(e._id);
                      setIndex(i);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mx-3 px-4 rounded"
                    type="button"
                    onClick={() => {
                      deleteData(e._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h3>No tasks</h3>
        </>
      )}
    </div>
  );
};
export default Task;
