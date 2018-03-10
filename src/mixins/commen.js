export default {
  data: function() {
    return {
      timer: '',
      zoom: {
        start: 0,
        end: 100
      }
    }
  },
  methods: {
    // 监听缩放
    datazoomHandler(e) {
      if (this.timer) window.clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const { start, end } = e
        this.zoom = {
          start,
          end
        }
      }, 1000)
    }
  }
}
