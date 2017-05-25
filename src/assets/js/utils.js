let utils = {}

utils.query = {}
utils.query.parse = (url) => {
  if (url.charAt(0) === '?') { url = url.slice(1) }
  let params = url.split('&')
  let paramsObj = {}
  params.forEach(value => {
    value = value.split('=')
    paramsObj[value[0]] = value[1]
  })
  return paramsObj
}
utils.query.stringify = (queryObj) => {
  let query = '?'
  Object.keys(queryObj).forEach(key => {
    if (queryObj[key]) {
      query = query + key + '=' + queryObj[key].toString() + '&'
    }
  })
  // В конце будет лишний символ "&", уберем его
  return query.slice(0, -1)
}

export default utils
