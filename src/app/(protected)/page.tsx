const taskDashboard = [
  {
    name: "Total Task",
    count: 10,
  },
  {
    name: "In Progress",
    count: 5,
  },
  {
    name: "Completed",
    count: 3,
  },
];

export default function Home() {
  return (
    <div className="">
      <div className="border mt-5 py-1.5 px-2.5 border-primary rounded-md">
        <h1 className="text-4xl font-bold mt-2 capitalize">Today Task</h1>
        <div className="px-1 py-4 grid grid-cols-3 gap-4">
          {taskDashboard.map((task, key) => (
            <div
              key={key}
              className="text-lg border bg-secondary border-primary rounded-md py-5 px-2"
            >
              <h1 className="text-lg text-center font-medium">{task.name}</h1>
              <h1 className="text-6xl text-center mt-2 font-bold">
                {task.count}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="border mt-5 py-1.5 px-2.5 border-primary rounded-md">
        <h1 className="text-4xl font-bold mt-2 capitalize">Today Task</h1>
        <div className="px-1 py-4 grid grid-cols-3 gap-4">
          {taskDashboard.map((task, key) => (
            <div
              key={key}
              className="text-lg border bg-secondary border-primary rounded-md py-5 px-2"
            >
              <h1 className="text-lg text-center font-medium">{task.name}</h1>
              <h1 className="text-6xl text-center mt-2 font-bold">
                {task.count}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="border mt-5 py-1.5 px-2.5 border-primary rounded-md">
        <h1 className="text-4xl font-bold mt-2 capitalize">Today Task</h1>
        <div className="px-1 py-4 grid grid-cols-3 gap-4">
          {taskDashboard.map((task, key) => (
            <div
              key={key}
              className="text-lg border bg-secondary border-primary rounded-md py-5 px-2"
            >
              <h1 className="text-lg text-center font-medium">{task.name}</h1>
              <h1 className="text-6xl text-center mt-2 font-bold">
                {task.count}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div className="border mt-5 py-1.5 px-2.5 border-primary rounded-md">
        <h1 className="text-4xl font-bold mt-2 capitalize">Today Task</h1>
        <div className="px-1 py-4 grid grid-cols-3 gap-4">
          {taskDashboard.map((task, key) => (
            <div
              key={key}
              className="text-lg border bg-secondary border-primary rounded-md py-5 px-2"
            >
              <h1 className="text-lg text-center font-medium">{task.name}</h1>
              <h1 className="text-6xl text-center mt-2 font-bold">
                {task.count}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
