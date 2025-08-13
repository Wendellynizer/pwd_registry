export const Table = ({children}: {children: any}) => {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-300 bg-base-100">
        <table className="table table-sm table-zebra">
            {children}
        </table>
    </div>
  )
}

export const TableHead = ({children}: {children: any}) => {
  return (
    <thead>{children}</thead>
  )
}

export const TableRow = ({children}: {children: any}) => {
  return (
    <tr>{children}</tr>
  )
}


export const TableHeader = ({children}: {children: any}) => {
  return (
    <th className='font-medium text-xs'>{children}</th>
  )
}

export const TableBody = ({children}: {children: any}) => {
  return (
    <tbody>{children}</tbody>
  )
}

export const TableCell = ({children, colSpan=1, className}: {children: any, colSpan?: number, className?: string}) => {
  return (
    <td className={`py-4 ${className}`} colSpan={colSpan}>
        {children}
    </td>
  )
}

