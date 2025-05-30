import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const CheckNotLogged = (OriginComponent) => {
  const extenComponent = () => {
    const logged = useSelector(({ auth }) => auth.login.logged);
    return logged ? <Navigate to="/Login" /> : <OriginComponent />;
  };
  return extenComponent;
}

export default CheckNotLogged
