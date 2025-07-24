const ColumnedContainer = ({
  children,
  column = 1,
  className
}: {
  children?: React.ReactNode;
  column?: number;
  className?: string;
}) => {

  const columns = `grid-cols-${column.toString()}`

  // return <div className="flex gap-4">{children}</div>;
  return <div className={`grid ${columns} gap-4 ${className}`}>{children}</div>;
};

export default ColumnedContainer;