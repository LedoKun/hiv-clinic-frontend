import _ from 'lodash'

export default function dateToIsostring (dateObject) {
  if (!_.isDate(dateObject)) {
    return undefined
  }

  let isoString = dateObject
    .toLocaleString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'})
    .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')

  return isoString
}
