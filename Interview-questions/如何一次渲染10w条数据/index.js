// 1. 分页
const getList = () => {
  return new Promise((resolve, reject) => {
    const list = []
    for (let i = 0; i < 100000; i++) {
      const item = {
        src: 'xxx',
        text: i
      }
      list.push(item)
    }
    resolve(list)
  })
}

const renderList = async () => {
  console.time('test')

  const container = document.querySelector('#container')
  const list = await getList()
  const total = list.length
  const page = 0
  const limit = 200 // 10w/200 5000页
  const totalPage = Math.ceil(total/limit) // 向上取整，1.2 => 2

  const render = (page) => {
    if (page >= totalPage) return
    // setTimeout(() => {
      // for (let i = page * limit; i < page * limit + limit; i++) {
      for (let i = 0; i < total; i++) {
        const item = list[i]
        const div = document.createElement('div')
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        // div.innerHTML = `<span>${item.text}</span>`
        container.appendChild(div)
      }
      // render(page + 1)
  }
  render(page)
  console.timeEnd('test')
}

const renderList2 = async () => {
  // console.time('test')
  let start = Date.now()

  const container = document.querySelector('#container')
  const fragment = document.createDocumentFragment()
  const list = await getList()
  const total = list.length
  const page = 0
  const limit = 200 // 10w/200 5000页
  const totalPage = Math.ceil(total/limit) // 向上取整，1.2 => 2

  const render = (page) => {
    if (page >= totalPage) return
    // setTimeout(() => {
    window.requestAnimationFrame(() => {
      // for (let i = page * limit; i < page * limit + limit; i++) {
      for (let i = 0; i < total; i++) {
        const item = list[i]
        const div = document.createElement('div')
        div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
        // div.innerHTML = `<span>${item.text}</span>`
        fragment.appendChild(div)
        console.log('耗时：' + (Date.now() - start) + 'ms')
      }
      container.appendChild(fragment)
      // render(page + 1)
      // console.timeEnd('test')
    })
  }
  render(page)
}

renderList()