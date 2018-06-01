import React, { Component } from 'react';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         1
//       </div>
//     );
//   }
// }
//
// export default App;
