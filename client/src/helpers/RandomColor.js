export default {
  getOne () {
    let color = ''
    for (let i = 0; i < 3; i++) {
      let rgb = parseInt(Math.random() * (255 - 0) + 0).toString(16)
      if (rgb.length < 2) {
        rgb = '0' + rgb
      }
      if (i === 0) {
        color = '#'
      }
      color = color + rgb
    }
    return color
  },
  get (qtd) {
    let colors = []
    for (let i = 0; i < qtd; i++) {
      colors.push(this.getOne())
    }
    return colors
  }
}
