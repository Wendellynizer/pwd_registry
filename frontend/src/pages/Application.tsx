import React from 'react';
import { Link } from 'react-router';

const Application = () => {
  return (
    <>
      <div>
        <Link to='/pwd-form' className='btn btn-success'>Create Application</Link>
        <p>Hi</p>
      </div>
    </>
  )
}

export default Application;