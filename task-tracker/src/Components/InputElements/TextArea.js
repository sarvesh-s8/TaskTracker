import React from "react";

const TextArea = ({ taskDesribe, setTaskDescribe }) => {
  return (
    <>
      <label
        htmlFor="taskDescription"
        className="block text-sm font-semibold text-violet-900 mb-2"
      >
        Task Description{" "}
      </label>
      <textarea
        id="taskDescription"
        value={taskDesribe.taskDescription}
        onChange={(e) =>
          setTaskDescribe({
            ...taskDesribe,
            [e.target.name]: e.target.value,
          })
        }
        name="taskDescription"
        rows={4}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        // cols={10}
      />
    </>
  );
};

{
  /* <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
<textarea id="message" rows="4" class="" placeholder="Write your thoughts here..."></textarea> */
}

export default TextArea;
