import React from 'react';
import Select from 'react-select';
const Login = ({
  handleLogin,
  handleUsername,
  handlePassword,
  handleSelect
}) => {
  const options = [
    { value: 'Student', label: 'Student' },
    { value: 'Teacher', label: 'Teacher' }
  ];
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type='text' name='Username' onChange={handleUsername} />
      </div>
      <div>
        password
        <input type='password' name='Password' onChange={handlePassword} />
      </div>
      <div>
        <Select onChange={handleSelect} options={options} />
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default Login;
