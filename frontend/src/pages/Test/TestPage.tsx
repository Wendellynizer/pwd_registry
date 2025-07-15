import { useLocation } from 'react-router';
useLocation

const TestPage = () => {

  const location = useLocation();
	const formData = location.state;


	// if(!formData) {
	// 	return <div>Loading...</div>
	// } else {
	// 	return (
	// 			<div>
	// 				<h2 className='font-bold text-2xl mb-5'>Data Preview</h2>
					
	// 				{/* {Object.entries(formData).map(([key, value]: any) => (
	// 					<p key={key} className={value ? '' : 'text-red-700'}>
	// 						{key}: {typeof value === 'object' && value !== null
	// 							? JSON.stringify(value)
	// 							: value}
	// 					</p>
	// 				))} */}
					
	// 				{Object.entries(formData).map(([key, value]: any, index) => {
	// 					if()
	// 				})}
	// 			</div>
	// 		);
	// }
  
	return(
		renderObject(formData)
	)
}

export default TestPage;

const renderObject = (obj: any, depth = 0) => {
  return (
    <div style={{ marginLeft: depth * 16 }}>
      {Object.entries(obj).map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return (
            <div key={key}>
              <strong>{key}:</strong>
              {renderObject(value, depth + 1)}
            </div>
          );
        } else {
          return (
            <div key={key} className={`${value ? '' : 'text-red-500'}`} >
              <span>{key}:</span> <span>{String(value)}</span>
            </div>
          );
        }
      })}
    </div>
  );
};