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

interface FormData {
  title: string;
  subtitle: string;
}

export default function ItemModal({ isOpen, initialData, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { title: "", subtitle: "" },
  });

  useEffect(() => {
    reset(initialData ?? { title: "", subtitle: "" });
  }, [initialData, reset]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
  };

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
            <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
              {initialData ? "ویرایش آیتم" : "افزودن آیتم"}
            </h2>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4 text-right">
              <FormField
                label="عنوان"
                {...register("title", { required: "عنوان الزامی است" })}
                error={errors.title?.message}
              />
              <FormField
                label="توضیح"
                {...register("subtitle")}
              />

              <div className="flex justify-start gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                >
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

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

function FormField({ label, error, ...props }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="border border-gray-300 rounded-lg w-full p-2 mt-1 focus:ring-2 focus:ring-purple-400 text-right"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
