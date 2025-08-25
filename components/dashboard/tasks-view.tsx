export default function TasksView() {
  const tasks = {
    backlog: ["Add billiards pricing", "Update karaoke song list"],
    doing: ["Configure floor plan editor", "Integrate Spotify API"],
    done: ["Install security cameras", "Set up POS system"],
  };

  const Column = ({ title, items }: { title: string; items: string[] }) => (
    <div className="card">
      <h3>{title}</h3>
      <div className="list">
        {items.map((t) => (
          <div key={t} className="item">
            <div>{t}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid tasks-cols gap-4">
      <Column title="Backlog" items={tasks.backlog} />
      <Column title="Doing" items={tasks.doing} />
      <Column title="Done" items={tasks.done} />
    </div>
  );
}
