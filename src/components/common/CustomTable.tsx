
import { CustomTableProps } from "../../Types" 

/**
 * A reusable custom table component for displaying tabular data.
 * 
 * @template T - The type of data being displayed in the table.
 * 
 * @param {CustomTableProps<T>} props - The props for the CustomTable component.
 * @param {T[]} props.data - The array of data objects to be displayed in the table.
 * @param {Array<{ header: string; accessor: string; render?: (row: T) => React.ReactNode }>} props.columns - 
 *        The column definitions for the table. Each column should have a `header` for the column title,
 *        an `accessor` for the key in the data object, and an optional `render` function for custom rendering.
 * @param {string} [props.emptyMessage="No data Found"] - The message to display when there is no data.
 * 
 * @returns {JSX.Element} The rendered table component.
 */
export function CustomTable<T>({ data, columns, emptyMessage = "No data Found" }: CustomTableProps<T>) {
    return (
        <div className="custom-table-container">
            {
                data.length === 0 ? (
                    <h3>{emptyMessage}</h3>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                {columns.map((column, index) => (
                                    <th key={index}>{column.header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => { 
                                return (
                                    <tr key={rowIndex}>
                                        {columns.map((col: any, colIndex: number) => { 
                                            return (
                                                <td key={colIndex}>
                                                    {col.render ? col.render(row) : (row as any)[col.accessor]}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}