import React, { Component } from "react";
import "./styles/styles.css";
import TodoList from "./components/TodoList";
import Switch from "./components/Switch";
import AddTodoItem from "./components/AddTodoItem";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  state = {
    todoItems: [],
    sortedTodoItems: [],
    isSorted: false,
  };

  componentDidMount() {
    const todoItems = [
      {
        id: "ae88082c-eb8e-45f5-b8cf-547e7105f0a0",
        description: "Learn ReactJs",
        checked: false,
      },
      {
        id: "a42eaf61-85c8-4fc5-a0de-e97004232ea4",
        description: "Code a todo list",
        checked: false,
      },
      {
        id: "e477d69b-adab-4fed-bfd5-c72f3247080b",
        description: "Keep learning",
        checked: false,
      },
    ];

    this.setState({ todoItems });
  }

  handleChecked = (todoItem) => {
    const todoItems = [...this.state.todoItems];
    const index = todoItems.indexOf(todoItem);

    todoItems[index].checked = !todoItems[index].checked;

    this.setState({ todoItems });
  };

  handleDelete = (deletedTodoItem) => {
    const todoItems = [...this.state.todoItems];
    const sortedTodoItems = [...this.state.sortedTodoItems];

    var filteredTodoItems = todoItems.filter(
      (todoItem) => todoItem.id !== deletedTodoItem.id
    );

    var filteredSortedTodoItems = sortedTodoItems.filter(
      (todoItem) => todoItem.id !== deletedTodoItem.id
    );

    this.setState({
      todoItems: filteredTodoItems,
      sortedTodoItems: filteredSortedTodoItems,
    });
  };

  handleSort = () => {
    let todoItems = [...this.state.todoItems];

    if (this.state.isSorted === true) {
      this.setState({ todoItems, isSorted: false });

      return;
    }

    var checkedTodoItems = todoItems.filter((t) => t.checked === true);
    var uncheckedTodoItems = todoItems.filter((t) => t.checked === false);

    todoItems = uncheckedTodoItems.concat(checkedTodoItems);

    this.setState({ sortedTodoItems: todoItems, isSorted: true });
  };

  handleAddTodoItem = (todoItemDescription) => {
    if (!todoItemDescription) return;

    const todoItems = [...this.state.todoItems];

    todoItems.push({
      id: uuidv4(),
      description: todoItemDescription,
      checked: false,
    });

    this.setState({ todoItems });
  };

  render() {
    let todoItems;

    if (this.state.isSorted === true)
      todoItems = [...this.state.sortedTodoItems];
    else todoItems = [...this.state.todoItems];

    return (
      <main>
        <div className='card'>
          <div className='card-header'>
            Todo List
            <div className='description'>
              Get things done, one item at a time.
            </div>
            <div className='card-line'></div>
          </div>
          <TodoList
            todoItems={todoItems}
            areToDoItemsSorted={this.state.isSorted}
            onChecked={this.handleChecked}
            onDeleteClick={this.handleDelete}
          />
          <Switch
            text='Move done items at the end?'
            onClick={this.handleSort}
          />
          <AddTodoItem
            label='Add to the todo list'
            buttonText='ADD ITEM'
            onClick={this.handleAddTodoItem}
          />
        </div>
      </main>
    );
  }
}

export default App;
