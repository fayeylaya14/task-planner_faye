<template>
  <div>
    <b-dropdown text="Right align" no-caret toggle-class="no_style">
      <template #button-content>
        <font-awesome-icon
          :icon="['fas', 'circle-user']"
        />
      </template>
      <b-container fluid>
        <b-row class="my-1">
          <b-col>
            <b-form-input v-model="searchRes" placeholder="Search"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <b-dropdown-item-button
        v-for="users in resultQuery"
        v-bind:key="users.id"
        class="dropdown-item"
        @click="addAssignee(task.id, users.id)"
      >
        <b-avatar variant="info" :src="users.avatar"></b-avatar>
        <p> {{ users.name }} </p>
      </b-dropdown-item-button>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchRes: ''
    }
  },
  props: {
    users: [],
    task: []
  },
  // async fetch ({ store }) {
  //   this.users = await store.dispatch('fetchUsers')
  // },
  methods: {
    addAssignee (taskID, userID) {
      console.log(taskID)
      this.$store.commit('update_assignee', taskID, userID)
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
