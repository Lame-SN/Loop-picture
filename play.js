// 轮播图

const nextIndex = function(slide, offset) {
    // let self = button
    // let slide = self.parentElement
    let numberOfImgs = Number(slide.dataset.imgs)
    let activeIndex = Number(slide.dataset.active)

    // let offset = Number(self.dataset.offset)
    // // 求出下一张图片的 id
    let index = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return index
}

const showImageAtIndex = function(slide, index) {
    let nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    let nextSelector = '#id-guaimage-' + String(nextIndex)
    // 删除当前图片的 class 给下一张图片加上 class
    let className = 'gua-active'
    removeClassAll(className)
    let img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    // 1. 删除当前小圆点的 class
    let indiClassName = 'gua-white'
    removeClassAll(indiClassName)
    // 2. 得到下一个小圆点的 selector
    let selector = '#id-indi-' + String(nextIndex)
    let indi = e(selector)
    indi.classList.add(indiClassName)
}

const bindEventSlide = function() {
    let selector = '.gua-slide-button'
    bindAll(selector, 'click', function(event) {
        log('click next')
        let self = event.target
        // 找到 slide div
        let slide = self.parentElement
        let offset = Number(self.dataset.offset)
        let index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

const bindEventIndicator = function() {
    let selector = '.gua-slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let slide = self.closest('.gua-slide')
        let index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        showImageAtIndex(slide, index)
    })
}

const bindEventOver = function(clockId) {
    let slide = e('.gua-slide')
    slide.addEventListener('mouseover', function() {
        clearInterval(clockId)
    })
}

const bindEvents = function(clockId) {
    bindEventSlide()
    bindEventIndicator()
    bindEventOver(clockId)
}

const playNextImage = function() {
    let slide = e('.gua-slide')
    let index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    let clockId = setInterval(function() {
        // 每 2s 调用这个函数
        playNextImage()
    }, interval)
    return clockId
}

const timerDemo = function() {
    log('开始时间', new Date())
    let clockId = setInterval(function() {
        log('time', new Date())
    }, 1000)

    setTimeout(function() {
        log('clockId', clockId)
        clearInterval(clockId)
    }, 4000)
}

const __main = function() {
    timerDemo()
    let clockId = autoPlay()
    bindEvents(clockId)
}

__main()
