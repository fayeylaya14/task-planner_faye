<template>
  <div>
    <div>
      <div>
        <b-container fluid>
          <b-row class="my-1">
            <b-col>
              <b-form-input v-model="searchItem" placeholder="Search"></b-form-input>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
    <b-tabs align="right">
    <b-tab title="All" active>
      <!-- <draggable v-model="draggable"> -->
        <Task
          v-for="task in resultQuery"
          v-bind:key="task.id"
          :task="task"
        />
      <!-- </draggable> -->
    </b-tab>
    <b-tab title="Important" @click="getImportant">
      <Task
        v-for="task in resultImportant"
        v-bind:key="task.id"
        :task="task"
      />
    </b-tab>
    <b-tab title="Done" @click="getDone">
      <Task
        v-for="task in resultDone"
        v-bind:key="task.id"
        :task="task"
      />
    </b-tab>
  </b-tabs>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'
import Task from '../components/Task'
// import Search from '../components/Search'
export default {
  data () {
    return {
      importantList: [],
      doneList: [],
      searchItem: ''
    }
  },
  props: {
    task: []
  },
  components: {
    Task
    // draggable
  },
  methods: {
    getImportant () {
      this.importantList = this.task.filter(imList => imList.is_important === true)
    },
    getDone () {
      this.doneList = this.task.filter(imList => imList.is_done === true)
    }
  },
  computed: {
    resultQuery () {
      console.log(this.searchItem)
      if (this.searchItem) {
        return this.task.filter((item) => {
          return this.searchItem.toLowerCase().split('').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.task
      }
    },
    draggable: {
      get () {
        return this.$store.state.tasks
      },
      set (value) {
        this.$store.commit('update_sort', value)
      }
    },
    resultImportant () {
      if (this.searchItem) {
        return this.importantList.filter((item) => {
          return this.searchItem.toLowerCase().split('').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.importantList
      }
    },
    resultDone () {
      if (this.searchItem) {
        return this.doneList.filter((item) => {
          return this.searchItem.toLowerCase().split('').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.doneList
      }
    }
  }
}
</script>
