import logo from './logo.svg';
import './App.css';
import Main from './Pages/Main';
import { Theme } from './Context/Provider';
import { useState } from 'react';
import ColorMode from './Theme/ColorMode';

function App() {
  let [themeMode,changeTheme] = useState(!window.matchMedia("(prefers-color-scheme: dark)").matches)
  return (
    <Theme.Provider value={{themeMode:themeMode, changeTheme:changeTheme, colorFunction: ColorMode}}>
      <Main />
    </Theme.Provider>
  );
}

export default App;
