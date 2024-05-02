import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, todoSearch, updateTodo } from "../Store/todoSlice";
import {
  editTodo,
  fetchData,
  deleteTodo,
  searchTodos,
} from "../Store/actions/todoActions";
import { addTodos } from "../Store/actions/todoActions";
import { useNavigate } from "react-router-dom";
import { TextField, Grid, Button, Paper, Stack } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import "./todolist.css";

const TodoList = () => {
  const [input, setInput] = useState("");
  const [textEdit, setTextEdit] = useState("");
  const [idEdit, setIdEdit] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isAddTaskInput, setIsAddTaskInput] = useState(true);
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos.todos);
  const searchedTodo = useSelector((state) => state.todos.searchedTodo);
  console.log(searchedTodo);

  const dispatch = useDispatch();

  const handleSearch = () => {
    console.log("handleSearch working ");
    setShowSearch(!showSearch);
    setShowAddTask(false);
    setIsAddTaskInput(false);
    if (!showSearch && input === "") {
      dispatch(todoSearch([]));
      return;
    }

    if (input !== "") {
      dispatch(searchTodos(input));
    }
  };

  const handleAddTask = () => {
    setShowAddTask(!showAddTask);
    setShowSearch(false);
    setIsAddTaskInput(true);
    dispatch(
      addTodos({
        todo: input,
      })
    );
    setInput("");
  };

  const handleEdit = (id, text) => {
    console.log(textEdit);
    setTextEdit(text);
    setIdEdit(id);
  };

  const handleUpdate = () => {
    dispatch(
      editTodo({
        id: idEdit,
        newData: textEdit,
      })
    );
    setTextEdit("");
    setIdEdit(null);
  };

  const handleRemove = (id) => {
    console.log("remove working");
    dispatch(deleteTodo(id));
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    dispatch(fetchData());
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ position: "fixed" }}
    >
      <Grid item xs={20} sm={6} md={4}>
        <Paper
          elevation={24}
          sx={{
            border: "10px solid transparent",
            position: "relative",
            height: "600px",
            marginTop: "40px",
            overflow: "auto",
          }}
        >
          {/* Add Task Button */}
          <Stack spacing={2} direction="row">
            <div
              style={{
                width: "50vw",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                onClick={handleAddTask}
                style={{
                  width: "50px",
                  height: "50px",
                  background: "white",
                  position: "sticky",
                  bottom: "10px",
                  right: "10px",
                  borderRadius: "50%",
                  margin: "2px",
                  border: "1px solid white ",
                  zIndex: "10001",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "4px 4px 8px #bfbfbf, -4px -4px 8px #ffffff",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                <AddCircleRoundedIcon
                  size="large"
                  style={{ fontSize: "50px", color: "#2196F3" }}
                />
              </button>
              {/* Search Button */}
              <button
                className="search-btn"
                onClick={handleSearch}
                style={{
                  width: "50px",
                  height: "50px",
                  position: "sticky",
                  bottom: "50px",
                  right: "10px",
                  marginBottom: "2vw",
                  borderRadius: "50%",
                  border: "2px solid white",
                  background: "white",
                  zIndex: "10001",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "4px 4px 8px #bfbfbf, -4px -4px 8px #ffffff",
                }}
              >
                <SearchSharpIcon
                  size="large"
                  style={{ fontSize: "50px", color: "#229DF7" }}
                />
              </button>
            </div>
          </Stack>
          {/* Add Task Modal */}
          {showAddTask && isAddTaskInput && (
            <div
              className="blur-background"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            >
              <TextField
                variant="outlined"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add new task..."
                className="main-input"
                size="small"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "1000",
                  backgroundColor: "white",
                }}
              />
            </div>
          )}
          {/* Search Modal */}
          {showSearch && !isAddTaskInput && (
            <div
              className="blur-background"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
            >
              <TextField
                variant="outlined"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search..."
                className="main-input"
                size="small"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: "1000",
                  backgroundColor: "white",
                }}
              />
            </div>
          )}
          {/* Display Todos */}
          <div className="todo-list-container">
            {showSearch && searchedTodo.length > 0
              ? searchedTodo.map((todo, index) => (
                  <Paper
                    key={todo._id}
                    elevation={3}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      "&:hover": {
                        boxShadow: "0px 5px 10px rgba(1, 0, 0, 0.9)",
                      },
                    }}
                  >
                    <input type="checkbox" />
                    {idEdit === todo._id ? (
                      <>
                        <input
                          type="text"
                          value={textEdit}
                          onChange={(e) => setTextEdit(e.target.value)}
                        />
                        <button
                          className="update-task-btn"
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{todo.todo}</span>
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleEdit(todo._id, todo.todo)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleRemove(todo._id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Stack>
                      </>
                    )}
                  </Paper>
                ))
              : todos.map((todo, index) => (
                  <Paper
                    key={todo._id}
                    elevation={3}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#e0e0e0",
                      padding: "10px",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      "&:hover": {
                        boxShadow: "0px 5px 10px rgba(1, 0, 0, 0.9)",
                      },
                    }}
                  >
                    <input type="checkbox" />
                    {idEdit === todo._id ? (
                      <>
                        <input
                          type="text"
                          value={textEdit}
                          onChange={(e) => setTextEdit(e.target.value)}
                        />
                        <button
                          className="update-task-btn"
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <>
                        <span>{todo.todo}</span>
                        <Stack spacing={2}>
                          <Stack direction="row" spacing={2}>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() => handleEdit(todo._id, todo.todo)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              onClick={() => handleRemove(todo._id)}
                            >
                              Delete
                            </Button>
                          </Stack>
                        </Stack>
                      </>
                    )}
                  </Paper>
                ))}
          </div>
          {/* Logout Button */}
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              color="warning"
              onClick={handleLogout}
              style={{ marginTop: "10px" }}
            >
              Logout
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default TodoList;
