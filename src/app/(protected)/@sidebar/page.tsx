const sidebarItems = [
  { name: "Dashboard", href: "#" },
  { name: "Tasks", href: "#" },
  { name: "Profile", href: "#" },
];

export default function page() {
  return (
    <div className="w-56 border-r border-primary py-4 h-full">
      <h1 className="text-4xl px-4 text-center text-primary font-bold">
        TaskZen
      </h1>
      <hr className="mb-3 mt-[11px] bg-primary" />
      <ul className="px-2 space-y-3 text-lg uppercase font-semibold">
        <li className="px-2 rounded-md py-1 border-primary bg-primary text-white w-full">
          <a href="#">Active</a>
        </li>
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            className="px-2 rounded-md py-1 border border-primary text-primary w-full"
          >
            <a href={item.href}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
