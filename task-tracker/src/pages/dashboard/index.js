import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Task from "@/Components/Task";
import Modal from "@/Components/Task/Modal";
export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [id, setId] = useState("");
  const [taskDesribe, setTaskDescribe] = useState({
    taskTitle: "",
    taskProgress: "",
    taskDueDate: "",
    taskDescription: "",
  });
  const [sortfun, setSortFun] = useState("");
  const [index, setIndex] = useState(0);
  const [selectedTask, setSelectedTask] = useState([]);
  console.log(taskDesribe);
  useEffect(() => {
    const auth = localStorage.getItem("x-auth-token");
    if (!auth) {
      router.push("/login");
    } else {
      fetchUserTasks(sortfun);
    }
  }, [sortfun, setSortFun]);

  const deleteData = async (id) => {
    try {
      await axios.delete(`/api/task/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      });
      const updatedTasks = tasks.filter((t) => t._id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      toast.error("Something Went Wrong ");
    }
    // fetchUserTasks();
  };
  const addTask = async (event) => {
    const { taskDueDate, taskTitle, taskProgress, taskDescription } =
      taskDesribe;
    console.log(taskDescription);
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/task",
        { taskTitle, taskProgress, taskDueDate, taskDescription },
        {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        }
      );
      setTasks([...tasks, data.data]);
      toast.success(`Task ${data.data.taskTitle} added`);
      setTaskDescribe({
        taskTitle: "",
        taskProgress: "",
        taskDueDate: "",
        taskDescription: "",
      });
    } catch (error) {
      toast.error("Something Went Wrong ");
    }
    setShow(false);
  };

  const editTask = async (event, id) => {
    event.preventDefault();
    const { taskTitle, taskProgress, taskDueDate, taskDescription } =
      taskDesribe;
    try {
      const { data } = await axios.put(
        `/api/task/${id}`,
        { taskTitle, taskProgress, taskDueDate, taskDescription },
        {
          headers: {
            "x-auth-token": localStorage.getItem("x-auth-token"),
          },
        }
      );

      setTasks(data.data);
      toast.success("Task Edited Successfully");
      setSelectedTask([]);
      setIndex("");
      setId("");
      setTaskDescribe({
        taskTitle: "",
        taskProgress: "",
        taskDueDate: "",
        taskDescription: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
    setShow(false);
  };

  const fetchUserTasks = async (sortingType) => {
    let api = "";
    if (sortingType) {
      api = `/api/task?sortBy=${sortingType}`;
    } else {
      api = "/api/task";
    }
    try {
      const { data } = await axios.get(api, {
        headers: {
          "x-auth-token": localStorage.getItem("x-auth-token"),
        },
      });
      setTasks(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [bgColor, setBgColor] = useState("");

  return (
    <div className={`${bgColor} h-screen`}>
      <button
        onClick={() => {
          setShow(true);
          setModalType("Add");
          setSelectedTask([]);
          setBgColor("");
        }}
        className=" mt-2 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 mx-3 px-4 rounded"
      >
        Add
      </button>

      <button
        className="bg-emerald-500 mt-2 hover:bg-emerald-700 text-white font-bold py-2 mx-3 px-4 rounded"
        onClick={() => {
          setSortFun("asc");
          setBgColor("bg-emerald-100");
        }}
      >
        Ascending
      </button>
      <button
        className="mt-2 bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 mx-3 px-4 rounded"
        onClick={() => {
          setSortFun("desc");
          setBgColor("bg-amber-100");
        }}
      >
        Descending
      </button>
      <button
        className="mt-2 bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 mx-3 px-4 rounded"
        onClick={() => {
          setSortFun("");
          setBgColor("");
        }}
      >
        Clear
      </button>

      {show && (
        <Modal
          show={show}
          setShow={setShow}
          taskDesribe={taskDesribe}
          setTaskDescribe={setTaskDescribe}
          modalType={modalType}
          handleSubmit={addTask}
          tasks={tasks}
          id={id}
          selectedTask={selectedTask}
          editTask={editTask}
        />
      )}

      <Task
        bgColor={bgColor}
        tasks={tasks}
        setTasks={setTasks}
        setId={setId}
        deleteData={deleteData}
        show={show}
        setShow={setShow}
        modalType={modalType}
        setModalType={setModalType}
        setIndex={setIndex}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
}
