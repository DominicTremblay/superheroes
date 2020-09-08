import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();

  const handleSubmit = (event) => {
    
    event.preventDefault();
    console.log("setting token")
    localStorage.setItem('token', 'abcdef123');
    history.push('/');
  };

  return (
    <>
      <h1>Please Login</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />

        <input type="submit" value="Login" />
      </form>
    </>
  );
}
