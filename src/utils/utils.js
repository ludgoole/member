// 事件代理
export function EventTrigger (event, ele) {
  // IE
  if (document.all) {
    document.getElementById(ele).click()
  } else {
    var e = document.createEvent('MouseEvents')
    e.initEvent(event, true, true)
    if (document.getElementById(ele)) {
      document.getElementById(ele).dispatchEvent(e)
    }
  }
}
