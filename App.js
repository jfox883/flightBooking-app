import React from 'react';
import { Provider } from "react-redux";

import MainNavigator from './src/navigation/MainNavigator'
import Store from "./src/redux/store"

const store = Store()

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}