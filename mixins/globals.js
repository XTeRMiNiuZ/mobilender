export default {
  data () {
    return {
      title_page: 'rockman',
      page: 1,
      loading_data: false,
      total_list: 0,
      total_pages: 0,
      data_list: [],
      attrs: {
        class: 'mb-6',
        boilerplate: false,
        elevation: 2
      }
    }
  },
  watch: {
    page () {
      this.getData()
    }
  },
  methods: {
    getData () {
      const self = this
      this.loading_data = true
      this.$axios.$get(`/${this.title_page}?page=${this.page}&per_page=5`).then((response) => {
        const { data, total, total_pages: totalPages } = response
        self.loading_data = false
        self.data_list = data
        if (self.title_page === 'users') {
          for (const key in self.data_list) {
            // eslint-disable-next-line no-prototype-builtins
            if (self.data_list.hasOwnProperty(key)) {
              self.data_list[key].full_name = self.data_list[key].first_name + ' ' + self.data_list[key].last_name
            }
          }
        }
        self.total_list = total
        self.total_pages = totalPages
      })
    }
  }
}
