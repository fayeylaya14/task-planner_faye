<template>
  <div>
    <div class="main-container">
      <div>
        <h1>Welcome To The Task Planner</h1>
        <h5>Get things done with your day. A list that refreshes everyday</h5>
          <AddTask/>
      </div>
    </div>
  </div>
</template>

<script>
import AddTask from '../components/AddTask'
export default {
  data () {
    return {
      newTask: '',
      tasks: [],
      users: []
    }
  },
  components: {
    AddTask
  },
  async fetch ({ store }) {
    this.tasks = await store.dispatch('fetchTasks')
    this.users = await store.dispatch('fetchUsers')
  },
  computed: {
    getCount () {
      return this.$store.getters.getCount
    }
    // getList () {
    //   console.log(this.$store.state.tasks)
    //   return this.$store.state.tasks
    // }
  }
}
</script>
