function httpGetAsync (theUrl, callback) {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = () => {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
      callback(JSON.parse(xmlHttp.responseText))
  }
  xmlHttp.open('GET', theUrl, true) // true for asynchronous
  xmlHttp.send(null)
}

const runner = setInterval(() => {
  const target1 = document.getElementById('target_1').value
  const address1 = document.getElementById('address_1').value
  const target2 = document.getElementById('target_2').value
  const address2 = document.getElementById('address_2').value

  console.log('request start')
  httpGetAsync('http://api.coinone.co.kr/ticker/?format=json&currency=iota', (res) => {
    console.log('callback start')

    console.log(res)
    document.getElementById('now').value = res['last']

    const now = parseFloat(res['last'])

    const iFrame = document.getElementById('youtube')
    if (target1.length > 0 && address1.length > 0) {
      if (now <= parseFloat(target1)) {
        console.log('address1')
        if (!iFrame.src.includes(address1)) {
          iFrame.src = address1 + '?loop=1&autoplay=1'
        }
      }
    }

    if (target2.length > 0 && address2.length > 0) {
      if (now >= parseFloat(target2)) {
        console.log('address2')
        if (!iFrame.src.includes(address2)) {
          iFrame.src = address2 + '?loop=1&autoplay=1'
        }
      }
    }
  })

}, 10000)
