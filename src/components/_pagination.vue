<template>
  <ul class="pagination">
    <li class="prev" :class="{ disabled: !hasPrev() }" @click.prevent="changePage(prevPage)">
      <span>«</span>
    </li>

    <li v-for="page in pages" :class="{ active: current == page }">
      <a href="#" @click.prevent="changePage(page)">{{ page }}</a>
    </li>

    <li class="next" :class="{ disabled: !hasNext() }" @click.prevent="changePage(nextPage)">
      <span>»</span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      current: {
        type: Number,
        default: 1,
        required: true
      },
      total: {
        type: Number,
        default: 0,
        required: true
      },
      perPage: {
        type: Number,
        default: 0,
        required: true
      },
      pageRange: {
        type: Number,
        default: 5
      }
    },
    computed: {
      pages () {
        var pages = []
        for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
          pages.push(i)
        }
        return pages
      },
      rangeStart () {
        let start = this.current - this.pageRange
        return (start > 0) ? start : 1
      },
      rangeEnd () {
        let end = this.current + this.pageRange
        return (end < this.totalPages) ? end : this.totalPages
      },
      totalPages () {
        return Math.ceil(this.total / this.perPage)
      },
      nextPage () {
        return this.totalPages
      },
      prevPage () {
        return 1
      }
    },
    methods: {
      hasPrev () {
        return this.current > 1
      },
      hasNext () {
        return this.current < this.totalPages
      },
      // Можно добавить сюда смену query:
      changePage (page) {
        this.$scrollTo('body')
        this.$emit('page-changed', page)
      }
    }
  }
</script>

<style lang="scss">
  .next, .prev {
    cursor: pointer;
  }
</style>
