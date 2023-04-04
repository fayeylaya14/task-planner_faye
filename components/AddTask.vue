<template>
  <div>
    <input
      type="text"
      v-model="newTask"
      class="search-input"
      placeholder="What's your plan for today?"
      @keypress.enter="addTask"
    />
    <p class="instruction-span">Press <span>enter</span> to add task</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newTask: ''
    }
  },
  methods: {
    addTask () {
      if (this.newTask) {
        this.$store.commit('ADD_TASK', this.newTask)
        console.log(this.newTask)
        this.newTask = ''
        this.$router.push({
          path: '/tasks'
        })
      }
    }
  }
}
</script>
