"use client";
import { useMemo, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Tooltip } from "@mui/material";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/src/hooks/user/useGetUser";

const UserList = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: userList } = useGetUser();

  const filteredRows = useMemo(() => {
    if (!userList) return [];

    return userList
      .filter((row) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();
        const searchableValues = [
          row.name,
          row.email,
          row.id,
          row.company?.name,
        ].filter(Boolean);
        return searchableValues.some((value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(term),
        );
      })
      .map((row, index: number) => ({
        ...row,
        Id: row.id,
        sn: index + 1,
        companyName: row.company?.name ?? "",
      }));
  }, [userList, searchTerm]);

  const columns: GridColDef[] = [
    {
      field: "sn",
      headerName: "SN",
      flex: 0.1,
      sortable: false,
      headerClassName: "name-header",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "name-header",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 3,
      headerClassName: "name-header",
    },
    {
      field: "companyName",
      headerName: "Company",
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
            <Tooltip title="View Details">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/user/${params.row.id}`);
                }}
                className="text-green-600 hover:text-green-800 transition-colors border-none p-1"
              >
                <ArrowRight size={15} />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div className="p-4">
      <div className="flex  sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => router.push("/form")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow-sm transition-colors duration-200 w-6 sm:w-auto"
        >
          {" "}
          Go to Form Page
        </button>
      </div>

      <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.id}
          getRowHeight={() => "auto"}
          columnHeaderHeight={45}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
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
  );
};
export default UserList;
