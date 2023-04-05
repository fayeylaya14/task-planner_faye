// import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  tasks: [],
  count: 20,
  users: []
})

export const mutations = {
  ADD_TASK (state, task) {
    const date = new Date()
    const len = state.tasks.length
    let newTaskObj = []
    newTaskObj = {
      title: task,
      created_at: date,
      assignee: {},
      is_done: false,
      is_important: false,
      sort: 5,
      id: len + 1
    }
    state.tasks.push(newTaskObj)
    localStorage.setItem('taskList', JSON.stringify(state.tasks))
  },
  toggle_value (state, taskId) {
    state.tasks = state.tasks.map(todo => ({ ...todo, is_done: taskId === todo.id ? !todo.is_done : todo.is_done }))
    localStorage.setItem('taskList', JSON.stringify(state.tasks))
  },
  delete_task (state, task) {
    console.log(task)
    state.tasks.splice(state.tasks.indexOf(task), 1)
  },
  setTaskList (state, taskList) {
    state.tasks = taskList
  },
  toggle_favorite (state, taskId) {
    state.tasks = state.tasks.map(todo => ({ ...todo, is_important: taskId === todo.id ? !todo.is_important : todo.is_important }))
    localStorage.setItem('taskList', JSON.stringify(state.tasks))
  },
  setUsersList (state, userList) {
    state.users = userList
  },
  update_assignee (state, { taskID, user }) {
    console.log(user)
    state.tasks[taskID - 1].assignee = user
    localStorage.setItem('taskList', JSON.stringify(state.tasks))
  },
  update_task (state, value) {
    state.tasks[value.taskId - 1].title = value.updatedTask
  }
}

export const getters = {
  getCount: state => state.count,
  getList: state => state.tasks,
  getUsers: state => state.users
}

export const actions = {
  fetchTasks ({ commit }) {
    const apiUrl = 'https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/tasks'
    try {
      axios.get(apiUrl).then((response) => {
        commit('setTaskList', response.data)
      })
    } catch (ex) {
      console.log(ex)
    }
  },
  fetchUsers ({ commit }) {
    const apiUrl = 'https://63906a8d65ff41831112cdd1.mockapi.io/api/v1/users'
    try {
      axios.get(apiUrl).then((response) => {
        commit('setUsersList', response.data)
      })
    } catch (ex) {
      console.log(ex)
    }
  }
}
