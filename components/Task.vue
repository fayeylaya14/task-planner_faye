<template>
  <draggable>
    <div class="tast-card">
      <input
        type="checkbox"
        v-bind:checked="task.is_done"
        @change="toggleCheckbox(task.id)"/>
      <div :class="[task.is_done ? strikeThrough : normalText]">{{ task.title }}</div>
      <div class="icons">
        <DropdownUsers
          :users="users"
          :task="task"
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
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import PromptModal from '../components/PromptModal'
import DropdownUsers from '../components/DropdownUsers'
export default {
  name: 'Task',
  data () {
    return {
      strikeThrough: 'task_done_strike',
      normalText: 'normal_text',
      isModalVisible: false,
      activateStar: 'yellow_star',
      normalStar: 'normal_star',
      users: this.$store.state.users
    }
  },
  components: {
    PromptModal,
    DropdownUsers,
    draggable
  },
  props: {
    task: []
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
    }
  },
  computed: {
    getUserList () {
      return this.$store.state.users
    }
  }
}
</script>
