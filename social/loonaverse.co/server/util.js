const stripStyleTags = (s = '') =>
  s.replace(/<\/?(b|i|em|strong)>/ig, '')

const uniqueById = (xs) =>
  xs.filter((e, i) => xs.findIndex((a) => a.id === e.id) === i)

const sortByDate = (posts) =>
  [ ...posts ].sort((a, b) => new Date(b.__date) - new Date(a.__date))

module.exports = {
  stripStyleTags,
  uniqueById,
  sortByDate
}
