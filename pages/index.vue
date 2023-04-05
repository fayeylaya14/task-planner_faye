<template>
  <div>
    <div class="main-container">
      <div>
        <h1>Welcome To The Task Planner</h1>
        <h5>Get things done with your day. A list that refreshes everyday</h5>
          <AddTask/>
          <draggable v-model="getList">
            <p
              v-for="item in getList"
              v-bind:key="item.id"
            >
              {{ item.title }}
            </p>
          </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import AddTask from '../components/AddTask'
export default {
  // props: {
  //   items: [
  //     { item: 'item1', id: 1 },
  //     { item: 'item2', id: 2 },
  //     { item: 'item2', id: 3 }
  //   ]
  // },
  data () {
    return {
      newTask: '',
      tasks: [],
      users: [],
      items: [
        { item: 'item1', id: 1 },
        { item: 'item2', id: 2 },
        { item: 'item2', id: 3 }
      ]
    }
  },
  components: {
    AddTask,
    draggable
  },
  async fetch ({ store }) {
    this.tasks = await store.dispatch('fetchTasks')
    this.users = await store.dispatch('fetchUsers')
  },
  computed: {
    getCount () {
      return this.$store.getters.getCount
    },
    getList: {
      get () {
        return this.$store.state.tasks
      },
      set (value) {
        this.$store.commit('update_sort', value)
      }
    }
  }
}
</script>
