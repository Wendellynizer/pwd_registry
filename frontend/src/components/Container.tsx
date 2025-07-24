const Container = ({children, className}: {children: React.ReactNode, className?: string}) => {
  return(
    <div className={`bg-white border border-gray-300 rounded-sm p-4 ${className}`}>
      {children}
    </div>
  );
}

export default Container