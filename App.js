import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => setRecipes(data.data));
  }, [page, limit]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">🍲 Recipe Explorer</h1>

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th>Title</th>
            <th>Cuisine</th>
            <th>Rating</th>
            <th>Total Time</th>
            <th>Serves</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((r) => (
            <tr key={r.id} onClick={() => setSelected(r)} className="cursor-pointer hover:bg-gray-100">
              <td className="truncate">{r.title}</td>
              <td>{r.cuisine}</td>
              <td>{"⭐".repeat(Math.round(r.rating || 0))}</td>
              <td>{r.total_time} min</td>
              <td>{r.serves}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <Drawer open={true} onOpenChange={() => setSelected(null)}>
          <DrawerContent className="p-4">
            <h2 className="text-xl font-bold">{selected.title} - {selected.cuisine}</h2>
            <p><b>Description:</b> {selected.description}</p>
            <p><b>Total Time:</b> {selected.total_time} min</p>
            <details>
              <summary className="cursor-pointer">Show Prep & Cook Time</summary>
              <p>Prep Time: {selected.prep_time} min</p>
              <p>Cook Time: {selected.cook_time} min</p>
            </details>
            <h3 className="mt-4 font-semibold">Nutrients</h3>
            <table className="table-auto">
              <tbody>
                {Object.entries(selected.nutrients).map(([k, v]) => (
                  <tr key={k}><td>{k}</td><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}

