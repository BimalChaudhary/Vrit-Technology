"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { X, UserCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { addFormData, updateFormData } from "@/src/store/formSlice";
import { FormData } from "@/src/types/form/form.types";

interface FormAddAndEditProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: FormData | null;
}

const FormAddAndEdit = ({
  isOpen,
  onClose,
  initialData = null,
}: FormAddAndEditProps) => {
  const dispatch = useDispatch();
  const isEditing = !!initialData?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: initialData?.title || "",
      body: initialData?.body || "",
    },
  });

  // Reset form when initialData changes or modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialData?.title || "",
        body: initialData?.body || "",
      });
    }
  }, [isOpen, initialData, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (isEditing && initialData?.id) {
      dispatch(
        updateFormData({
          id: initialData.id,
          title: data.title,
          body: data.body,
        }),
      );
    } else {
      dispatch(
        addFormData({
          id: crypto.randomUUID(),
          title: data.title,
          body: data.body,
        }),
      );
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <UserCircle className="h-7 w-7 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? "Edit Form" : "Add New Form Data"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={26} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title", {
                required: "Title is required",
              })}
              placeholder="Enter Title"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Body <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("body", { required: "Body is required" })}
              placeholder="Enter Body"
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.body ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.body && (
              <p className="text-red-600 text-xs mt-1">{errors.body.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-sm font-medium border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              {isEditing ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAddAndEdit;
