import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const handlerSubmit = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file: File | undefined | null = e.currentTarget?.files ? e.currentTarget?.files[0] : null

    const user = new FormData();

    const reader = new FileReader();
    reader.readAsDataURL(file?.rawFile || '');

    reader.onload = () => {
      user.append('name', 'TEST')
      user.append('email','lazuka@mail.ru' )
      user.append('password', 'qwert976')
      user.append('password_confirmation', 'qwert976')
      user.append('avatar', '')

      console.log(user)

      fetch('http://0.0.0.0:3333/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: user
      })
        .then(console.log)
        .catch(console.log)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={handlerSubmit} type="file" name="avatar"/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
