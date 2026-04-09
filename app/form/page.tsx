"use client";
import { useMemo, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { Delete, Edit, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { deleteFormData } from "@/src/store/formSlice";
import DeleteConfirmation from "@/src/components/Form/DeleteConfirmation";
import FormAddAndEdit from "@/src/components/Form/FormAddAndEdit";
import { FormData } from "@/src/types/form/form.types";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingData, setEditingData] = useState<FormData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const dispatch = useDispatch();
  const reduxForms = useSelector((state: RootState) => state.form?.data || []);

  const sourceData = reduxForms;

  const filteredRows = useMemo(() => {
    if (!sourceData || sourceData.length === 0) return [];
    return sourceData
      .filter((row) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();
        return Object.values(row).some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(term),
        );
      })
      .map((row, index: number) => ({
        ...row,
        id: row.id,
        sn: index + 1,
      }));
  }, [sourceData, searchTerm]);

  const handleEdit = (row: FormData) => {
    setEditingData(row);
    setIsOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(deleteFormData(itemToDelete));
      setItemToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "sn",
      headerName: "SN",
      flex: 0.1,
      sortable: false,
      headerClassName: "name-header",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      headerClassName: "name-header",
    },
    {
      field: "body",
      headerName: "Body",
      flex: 3,
      headerClassName: "name-header",
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "name-header",
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-center h-full gap-2">
            <Tooltip title="Edit">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(params.row);
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors border-none p-1"
              >
                <Edit size={15} />
              </button>
            </Tooltip>
            <Tooltip title="Delete">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(params.row.id);
                }}
                className="text-red-600 hover:text-red-800 transition-colors border-none p-1"
              >
                <Delete size={15} />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditingData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-1">
          <h1 className="text-2xl font-bold text-gray-900">Form</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-1">
          <div className="w-full sm:w-auto sm:flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search by title or body..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       text-sm bg-white shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-blue-700 
                     text-white rounded-xl font-medium transition-all shadow-sm 
                     hover:shadow-md whitespace-nowrap flex-shrink-0"
          >
            <Plus size={20} strokeWidth={2.5} />
            Add
          </button>
        </div>

        {/* DataGrid Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row.id}
            getRowHeight={() => "auto"}
            columnHeaderHeight={48}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 15, 25]}
            disableRowSelectionOnClick
            disableColumnResize={false}
            sx={{
              border: "none",
              width: "100%",
              fontFamily: "inherit",
              "& .MuiDataGrid-cell": {
                fontSize: "0.8rem",
                borderBottom: "1px solid #f3f4f6",
                whiteSpace: "normal",
                wordBreak: "break-word",
                lineHeight: "1.4rem",
                alignItems: "start",
                paddingTop: "8px",
                paddingBottom: "8px",
              },
              "& .MuiDataGrid-columnHeader": {
                fontSize: "0.8rem",
                fontWeight: 600,
                backgroundColor: "#D3D3D3",
                borderBottom: "2px solid #e2e8f0",
                color: "#374151",
                textTransform: "none",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: 600,
              },
              "& .MuiDataGrid-row": {
                backgroundColor: "#ffffff",
                "&:nth-of-type(even)": {
                  backgroundColor: "#f9fafb",
                },
                "&:hover": {
                  backgroundColor: "#f0f9ff",
                  transition: "background-color 0.2s ease",
                },
              },
              "& .MuiDataGrid-main": {
                width: "100%",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f8fafc",
                borderTop: "1px solid #e2e8f0",
              },
              "& .MuiTablePagination-root": {
                fontSize: "0.875rem",
                color: "#6b7280",
              },
              "& .MuiDataGrid-selectedRowCount": {
                color: "#6b7280",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#ffffff",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              },
              "& .MuiDataGrid-columnHeader.name-header": {
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
              },
            }}
          />
        </div>
      </div>

      {/* Modal */}
      <FormAddAndEdit
        isOpen={isOpen}
        onClose={handleCloseModal}
        initialData={editingData}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Page;
