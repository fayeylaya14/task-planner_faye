<template>
  <div class="spacing">
    <div>
      <h1>Task Planner</h1>
      <FilterTabs
        :task="getList"
      />
    </div>
    <nuxt-child/>
    <AddTask/>
  </div>
</template>

<script>
import AddTask from '../components/AddTask'
import FilterTabs from '../components/FilterTabs'
export default {
  name: 'TaskView',
  data () {
    return {
      isModalVisible: false
    }
  },
  methods: {
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  },
  props: {
    tasks: []
  },
  components: {
    // Task,
    AddTask,
    FilterTabs
  },
  computed: {
    getList () {
      console.log(this.$store.state.tasks)
      return this.$store.state.tasks
    }
  }
}
</script>
