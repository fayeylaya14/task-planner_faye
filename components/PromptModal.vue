<template>
  <div class="modal-backdrop-custom" @click="$emit('close')">
    <div class="modal-custom">
      <header class="modal-header">
        <slot name="header">
          Are you sure you want do delete this task?
        </slot>
      </header>

      <section class="modal-body">
        <div class="btn-container">
          <button
            type="button"
            class="btn-green"
            @click="deleteTask()"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn-green"
            @click="$emit('close')"
          >
            No
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    taskItem: []
  },
  methods: {
    deleteTask () {
      console.log(this.taskItem.id)
      this.$store.commit('delete_task', this.taskItem)
    }
  }
}
</script>
