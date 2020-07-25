// 作用：重置html的font-size

function resetRootFZ(){
    // 获取html元素DOM对象
    var oHtml = document.querySelector('html');
    // 获取html的总宽度
    var width = oHtml.getBoundingClientRect().width
    // 设置根字体的大小等于html节点的宽度的十分之一
    oHtml.style.fontSize = width/10 + 'px';
    console.log('root font size',oHtml.style.fontSize)
}
  
resetRootFZ()

// 当window窗口尺寸变化时，重新设置根字体的大小
window.addEventListener('resize',function(){
    resetRootFZ()
})
