<template>
  <div>
    <b-dropdown text="Right align" no-caret toggle-class="no_style">
      <template #button-content>
        <b-avatar
          v-if="task.assignee.avatar"
          variant="info"
          size="sm"
          :src="task.assignee.avatar">
        </b-avatar>
        <div
          v-else
        >
          <font-awesome-icon
            :icon="['fas', 'circle-user']"
          />
        </div>
      </template>
      <b-container fluid>
        <b-row class="my-1">
          <b-col>
            <b-form-input v-model="searchRes" placeholder="Search"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <b-dropdown-item-button
        v-for="user in resultQuery"
        v-bind:key="user.id"
        class="dropdown-item"
        @click="addAssignee(task.id, user)"
      >
        <b-avatar variant="info" :src="user.avatar"></b-avatar>
        <p> {{ user.name }} </p>
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    users: [],
    task: []
  },
  data () {
    return {
      searchRes: ''
    }
  },
  // async fetch ({ store }) {
  //   this.users = await store.dispatch('fetchUsers')
  // },
  methods: {
    addAssignee (taskID, user) {
      console.log(JSON.stringify(user))
      // const userArr = JSON.stringify(user)
      this.$store.commit('update_assignee', { taskID, user })
    }
  },
  computed: {
    getUserList () {
      return this.$store.state.users
    },
    resultQuery () {
      if (this.searchRes) {
        return this.users.filter((item) => {
          return this.searchRes.toLowerCase().split('').every(v => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.users
      }
    }
  }
}
</script>
