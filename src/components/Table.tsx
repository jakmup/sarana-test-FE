import React from "react";


interface TableProps {
  columns: string[];
  data: { [key: string]: any }[];
  actions?: (item: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, data, actions }) => {
  console.log("Table received data:", data); // Debugging log

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            {columns.map((column) => (
              <th key={column} className="border p-4 text-left">{column}</th>
            ))}
            {actions && <th className="border p-4 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (actions ? 1 : 0)} className="p-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                {columns.map((column) => (
                  <td key={column} className="border p-3">{item[column]}</td>
                ))}
                {actions && (
                  <td className="border p-3 flex justify-center gap-2">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
