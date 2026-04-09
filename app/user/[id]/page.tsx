"use client";

import { useParams } from "next/navigation";
import { useGetUserById } from "@/src/hooks/user/useGetUserById";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Loader2 } from "lucide-react";

const Page = () => {
  const params = useParams();
  const idParam = params?.id;
  const id = idParam ? Number(idParam) : undefined;

  const { data: user, isLoading, error } = useGetUserById(id);

  if (!id) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Invalid User ID
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen gap-2 text-gray-700">
        <Loader2 className="animate-spin text-blue-500" size={24} /> Loading
        user...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-medium">
        Failed to load user data
      </div>
    );
  }

  const rows = [
    { id: 1, field: "Name", value: user.name },
    { id: 2, field: "Username", value: user.username },
    { id: 3, field: "Email", value: user.email },
    { id: 4, field: "Phone", value: user.phone },
    { id: 5, field: "Website", value: user.website },
    { id: 6, field: "Company Name", value: user.company.name },
    { id: 7, field: "Company CatchPhrase", value: user.company.catchPhrase },
    { id: 8, field: "Company BS", value: user.company.bs },
    { id: 9, field: "Address Street", value: user.address.street },
    { id: 10, field: "Address Suite", value: user.address.suite },
    { id: 11, field: "City", value: user.address.city },
    { id: 12, field: "Zipcode", value: user.address.zipcode },
    { id: 13, field: "Geo Latitude", value: user.address.geo.lat },
    { id: 14, field: "Geo Longitude", value: user.address.geo.lng },
  ];

  const columns: GridColDef[] = [
    {
      field: "field",
      headerName: "Field",
      flex: 1,
      headerClassName: "header-class",
    },
    {
      field: "value",
      headerName: "Value",
      flex: 2,
      headerClassName: "header-class",
    },
  ];

  return (
    <div className=" w-full flex justify-center px-2 py-4 overflow-x-hidden ">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 flex  justify-center text-gray-800">
          User Details
        </h1>
        <div className="w-full max-w[420px] mx-auto rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            rowHeight={35}
            hideFooter
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

              /* Specific column header */
              "& .MuiDataGrid-columnHeader.name-header": {
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontWeight: 600,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
