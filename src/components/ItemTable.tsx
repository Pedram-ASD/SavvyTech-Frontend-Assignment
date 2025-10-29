import { Pencil, Trash2 } from "lucide-react";
import type { Item } from "../App";

interface Props {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

function ActionButtons({ item, onEdit, onDelete }: { item: Item; onEdit: (item: Item) => void; onDelete: (id: string) => void }) {
  return (
    <div className="flex justify-center gap-2">
      <button
        onClick={() => onDelete(item.id)}
        className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      <button
        onClick={() => onEdit(item)}
        className="p-2 rounded-lg hover:bg-purple-100 text-purple-600 transition"
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ItemTable({ items, onEdit, onDelete }: Props) {
  const cellClass = "py-3 px-4 text-center";

  if (items.length === 0)
    return <p className="text-center text-gray-500 mt-10">داده ای برای نمایش وجود ندارد</p>;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className={cellClass}>عملیات</th>
            <th className={cellClass}>تاریخ</th>
            <th className={cellClass}>توضیحات</th>
            <th className={cellClass}>عنوان</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className={cellClass}>
                <ActionButtons item={item} onEdit={onEdit} onDelete={onDelete} />
              </td>
              <td className={cellClass}>{item.createdAt}</td>
              <td className={`${cellClass} max-w-xs truncate`} title={item.subtitle || "-"}>
                {item.subtitle || "-"}
              </td>
              <td className={`${cellClass} max-w-xs truncate`} title={item.title}>
                {item.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
