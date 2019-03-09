
export function get(url, param) {
  return fetch(url, {
    method: "GET",
    headers: new Headers({
      'Accept': 'application/json',
    }),
    body: JSON.stringify(param)
  }).then(res => {
    return res.json();
  }).catch(err => {
    console.warn(err);
  })
}


export function post(url, param) {
  return fetch(url, {
    method: "POST",
    mode:'cors',
    headers: new Headers({
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/json'
    }),
    body: JSON.stringify(param)
  }).then(res => {
    return res.json();
  }).catch(err => {
    console.warn(err)
  })
}

/**
 * check if scroll to bottom
 */
export function isScrollBottom() {
  if ((getScrollTop() + getWindowHeight()) - getScrollHeight() < 1000) {
    return true;
  }
  return false;
}

//滚动条在Y轴上的滚动距离
export function getScrollTop() {
  var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  if (document.body) {
    bodyScrollTop = document.body.scrollTop;
  }
  if (document.documentElement) {
    documentScrollTop = document.documentElement.scrollTop;
  }
  scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  return scrollTop;
}

//文档的总高度

export function getScrollHeight() {
  var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  if (document.body) {
    bodyScrollHeight = document.body.scrollHeight;
  }
  if (document.documentElement) {
    documentScrollHeight = document.documentElement.scrollHeight;
  }
  scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  return scrollHeight;
}

//浏览器视口的高度

export function getWindowHeight() {
  var windowHeight = 0;
  if (document.compatMode == "CSS1Compat") {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }
  return windowHeight;
}