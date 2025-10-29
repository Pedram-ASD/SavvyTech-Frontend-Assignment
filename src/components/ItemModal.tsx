import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { Item } from "../App";

interface Props {
  isOpen: boolean;
  initialData?: Item;
  onClose: () => void;
  onSubmit: (data: { title: string; subtitle: string }) => void;
}

export default function ItemModal({ isOpen, initialData, onClose, onSubmit }: Props) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ title: string; subtitle: string }>({
    defaultValues: { title: "", subtitle: "" },
  });

  useEffect(() => {
    if (initialData) reset({ title: initialData.title, subtitle: initialData.subtitle });
    else reset({ title: "", subtitle: "" });
  }, [initialData, reset]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto"
          >
            {/* عنوان وسط */}
            <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
              {initialData ? "ویرایش آیتم" : "افزودن آیتم"}
            </h2>

            <form
              onSubmit={handleSubmit((data) => {
                onSubmit(data);
                reset();
              })}
              className="flex flex-col gap-4 text-right"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">عنوان</label>
                <input
                  {...register("title", { required: "عنوان الزامی است" })}
                  className="border border-gray-300 rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-purple-400 text-right"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">توضیح</label>
                <input
                  {...register("subtitle")}
                  className="border border-gray-300 rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-purple-400 text-right"
                />
              </div>

              {/* دکمه‌ها پایین سمت چپ */}
              <div className="flex justify-start gap-3 mt-4">
                <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                  لغو
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600">
                  {initialData ? "ویرایش" : "ایجاد"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
