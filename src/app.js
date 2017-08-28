import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainReducer from 'reducers';
import ProjectList from 'components/ProjectList';
import Debugger from 'components/Debugger';
import Socket from 'socket';

const Store = createStore(MainReducer);
const s = new Socket(Store);

const App = ({ }) => (
  <Provider store={Store}>
    <section>
      <ProjectList/>
      <Debugger/>
    </section>
  </Provider>
);

export default App;
