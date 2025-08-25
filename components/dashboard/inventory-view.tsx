interface Item {
  name: string;
  on: number;
  par: number;
  vendor: string;
  status: "OK" | "Low" | "Critical";
}

export default function InventoryView() {
  const items: Item[] = [
    { name: "Ping Pong Balls (24ct)", on: 18, par: 36, vendor: "SportsPro", status: "Low" },
    { name: "San Pellegrino 500ml", on: 42, par: 60, vendor: "BeverageHub", status: "OK" },
    { name: "Lime Juice (1L)", on: 3, par: 12, vendor: "BarMart", status: "Critical" },
    { name: "Pool Cue Tips", on: 8, par: 20, vendor: "BilliardSupply", status: "Low" },
  ];

  const statusClass: Record<Item["status"], string> = {
    OK: "status s-ok",
    Low: "status s-busy",
    Critical: "status s-off",
  };

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h3 style={{ margin: 0 }}>Inventory</h3>
        <div className="row">
          <button className="btn">🧮 Recalc PAR</button>
          <button className="btn primary">📝 Create PO</button>
        </div>
      </div>
      <table className="table" aria-label="Inventory">
        <thead>
          <tr>
            <th>Item</th>
            <th>On Hand</th>
            <th>PAR</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.name}>
              <td>{it.name}</td>
              <td>{it.on}</td>
              <td>{it.par}</td>
              <td>{it.vendor}</td>
              <td>
                <span className={statusClass[it.status]}>{it.status}</span>
              </td>
              <td>
                <button className="btn" style={{ padding: "6px 10px" }}>🛒 Reorder</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
