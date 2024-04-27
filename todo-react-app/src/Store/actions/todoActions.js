import {createAsyncThunk } from "@reduxjs/toolkit";

import {setLoading ,initialTodo ,setError ,addTodo,updateTodo,todoDeleted, todoSearch} from '../todoSlice'
import {api} from "../../api";



export const fetchData = createAsyncThunk( 
  'todos/fetchData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await api.get('/dashboard', {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(setLoading(false));
      // console.log(response.data.data);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      dispatch(initialTodo(response.data.data));
    } catch (error) {
      dispatch(setError(error.message));
      throw error;
    }
  }
);
// export const fetchData  = ()=>async(dispatch)=>{
//   // console.log("function working")
//     try {

//         dispatch(setLoading(true))
//         const response=await api.get('/dashboard',{
//           headers:{
//             "Authorization":`Bearer ${localStorage.getItem("token")}`
//           }
//         })
//         console.log(response.data)
//         dispatch(setLoading(false));
//         if(response.data.error){
//             throw new Error(response.data.error)
//         }
//         dispatch( initialTodo(response.data.data))
//     } catch (error) {
//         console.log("error",error)
//         dispatch(setError(error.message))
//     }
   
// }

export const addTodos= (todo) => async (dispatch) => {
  try {
    // console.log("request sending ")
    dispatch(setLoading(true))
    const response = await api.post('/create_item', todo ,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data);
    dispatch(setLoading(false))
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    dispatch(addTodo(response.data.data));
    const emailData = {
      email: "recipient@example.com", // Replace with recipient's email address
      subject: "New Todo Added",
      message: `A new todo "${todo}" has been added.`
  };
  await sendEmail(emailData);
  } catch (error) {
    dispatch(setError(error.message))
    // console.log(error.message);
  }
}

export const editTodo= (todo) => async (dispatch) => {
  try {
    // console.log("request sending ")
    dispatch(setLoading(true))
    const response = await api.post('/edit_item', todo ,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    })
   
    dispatch(setLoading(false))
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    console.log(response.data.data);
    dispatch(updateTodo({
       id:todo.id,
       data:response.data.data
    }));
  } catch (error) {
    dispatch(setError(error.message))
    // console.log(error.message);
  }
}

export const deleteTodo= (id) => async (dispatch) => {
  try {
    // console.log("request sending ")
    dispatch(setLoading(true))
    const response = await api.post('/delete_item', {id},{
      headers:{ 
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data);
    dispatch(setLoading(false))
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    dispatch(todoDeleted(id));
  } catch (error) {
    dispatch(setError(error.message))
    // console.log(error.message);
  }
}

export const searchTodos = (todos)=>async(dispatch)=>{
  console.log("search api working ")
  try {
    dispatch(setLoading(true))
     const response = await api.get('/search_item',{
        params:{search:todos}
     })
     console.log(response.data.data);
     dispatch(setLoading(false));
     if (response.data.error) {
      throw new Error(response.data.error);
    }
      dispatch(todoSearch(response.data.data))
  } catch (error) {
    dispatch(setError(error.message))
  }
}
// export const mailSend = ()=>async(dispatch)=>{
//   try {
//      const response = await api.post('/sendemail')
//      console.log(response.data);
//      dispatch()
//   } catch (error) {
//      console.log(error)
//   }
// }
