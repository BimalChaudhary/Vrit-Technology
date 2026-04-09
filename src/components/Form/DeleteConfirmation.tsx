"use client";

// Icon
import { X } from "lucide-react";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmationProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[110]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-red-600">
              Delete this Form Item
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Are you sure to delete this Form Item
          </p>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
