<template>
  <div>
    <div class="tast-card">
      <input
        type="checkbox"
        v-bind:checked="task.is_done"
        @change="toggleCheckbox(task.id)"/>
      <div
        v-if="editToggle == true && editID === task.id"
        class="input-width"
      >
        <input
          type="text"
          class="search-input edit-input"
          v-model="editedTodo"
          @keypress.enter="updateTask(task.id)"
        />
        <font-awesome-icon
          class="x-icon"
          :icon="['fas', 'x']"
          @click="closeEdit"
        />
      </div>
      <div
        v-else
        :id="task.id"
        :class="[task.is_done ? strikeThrough : normalText]"
        @dblclick="editTask"
      >
        {{ task.title }}
      </div>
      <div class="icons">
        <DropdownUsers
          :users="users"
          :task="task"
        />
        <font-awesome-icon
          :id="task.id"
          class="trash-color"
          :icon="['fas', 'pencil']"
          @click="editTask"
        />
        <font-awesome-icon
          :class="[task.is_important ? activateStar : normalStar]"
          :icon="['fas', 'star']"
          @click="updateFavorite(task.id)"
        />
        <font-awesome-icon
        class="trash-color"
        :icon="['far', 'trash-can']"
        @click="showModal"
        />
      </div>
      <PromptModal
        v-show="isModalVisible"
        @close="isModalVisible=false"
        :taskItem="task"
      />
    </div>
  </div>
</template>

<script>
import PromptModal from '../components/PromptModal'
import DropdownUsers from '../components/DropdownUsers'
export default {
  name: 'Task',
  props: {
    task: []
  },
  data () {
    return {
      strikeThrough: 'task_done_strike',
      normalText: 'normal_text',
      isModalVisible: false,
      activateStar: 'yellow_star',
      normalStar: 'normal_star',
      users: this.$store.state.users,
      beforeEditCache: '',
      editedTodo: this.task.title,
      editToggle: true,
      editID: ''
    }
  },
  components: {
    PromptModal,
    DropdownUsers
  },
  methods: {
    getLoads () {
      console.log(this.props)
    },
    toggleCheckbox (taskID) {
      this.$store.commit('toggle_value', taskID)
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    updateFavorite (taskID) {
      this.$store.commit('toggle_favorite', taskID)
    },
    updateTask (taskId) {
      const updatedTask = this.editedTodo
      console.log(updatedTask)
      this.$store.commit('update_task', { taskId, updatedTask })
      this.editToggle = false
      // this.$store.commit()
    },
    editTask: function (e) {
      const target = parseInt(e.currentTarget.id)
      // this.$store.commit('update')
      this.editID = e.currentTarget.id
      this.editToggle = true
      console.log(target)
    },
    closeEdit () {
      this.editToggle = false
    }
  },
  computed: {
    getUserList () {
      return this.$store.state.users
    }
  }
}
</script>
