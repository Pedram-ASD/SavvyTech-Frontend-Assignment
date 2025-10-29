import { Pencil, Trash2 } from "lucide-react";
import type { Item } from "../App";

interface Props {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}

export default function ItemTable({ items, onEdit, onDelete }: Props) {
  if (items.length === 0)
    return <p className="text-center text-gray-500 mt-10">داده ای برای نمایش وجود ندارد</p>;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-gray-600">عملیات</th>
            <th className="py-3 px-4 text-center text-gray-600">تاریخ</th>
            <th className="py-3 px-4 text-center text-gray-600">توضیحات</th>
            <th className="py-3 px-4 text-center text-gray-600">عنوان</th> 
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="py-3 px-4 flex justify-center gap-2">
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
              </td>
              <td className="py-3 px-4 text-center">{item.createdAt}</td>
              <td className="py-3 px-4 text-center">{item.subtitle || "-"}</td>
              <td className="py-3 px-4 text-center">{item.title}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
