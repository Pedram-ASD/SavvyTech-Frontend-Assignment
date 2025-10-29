import { useState } from "react";
import ItemTable from "./components/ItemTable";
import ItemModal from "./components/ItemModal";
import { Plus } from "lucide-react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import './index.css'

dayjs.extend(jalaliday);

export type Item = {
  id: string;
  title: string;
  subtitle?: string;
  createdAt: string;
};

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const handleAddItem = (data: { title: string; subtitle: string }) => {
    const newItem: Item = {
      id: Date.now().toString(),
      title: data.title,
      subtitle: data.subtitle,
      createdAt: dayjs().calendar("jalali").locale("fa").format("YYYY/MM/DD HH:mm"),
    };
    setItems((prev) => [...prev, newItem]);
    setModalOpen(false);
  };

  const handleEditItem = (data: { title: string; subtitle: string }) => {
    if (!editingItem) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === editingItem.id
          ? { ...i, ...data, createdAt: dayjs().calendar("jalali").locale("fa").format("YYYY/MM/DD HH:mm") }
          : i
      )
    );
    setEditingItem(null);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-12">
      <div className="max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              setEditingItem(null);
              setModalOpen(true);
            }}
            className="p-2 rounded-full hover:bg-purple-100 transition"
          >
            <Plus className="w-6 h-6 text-purple-500" />
          </button>

          <h1 className="text-2xl font-bold text-gray-800"> لیست آیتم‌ها</h1>
        </div>

        <ItemTable
          items={items}
          onEdit={(item) => {
            setEditingItem(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        <ItemModal
          isOpen={modalOpen}
          initialData={editingItem || undefined}
          onClose={() => {
            setModalOpen(false);
            setEditingItem(null);
          }}
          onSubmit={(data) =>
            editingItem ? handleEditItem(data) : handleAddItem(data)
          }
        />
      </div>
    </div>
  );
}
