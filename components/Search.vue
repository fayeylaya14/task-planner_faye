<template>
  <div>
    <b-container fluid>
    <b-row class="my-1">
      <b-col>
        <b-form-input v-model="searchItem" placeholder="Search"></b-form-input>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchItem: ''
    }
  },
  props: {
    users: []
  },
  computed: {
    resultQuery () {
      console.log(this.searchItem)
      if (this.searchItem) {
        return this.users.filter((item) => {
          return this.searchItem.toLowerCase().split('').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.users
      }
    }
  }
}
</script>
