const baseTags = [
  '1/3',
  'choerry',
  'chuu',
  'go-won',
  'gowon',
  'haseul',
  'heejin',
  'hyunjin',
  'jinsoul',
  'kim-lip',
  'kimlip',
  'loona',
  'loonabirth',
  'loonablastingoff',
  'odd-eye-circle',
  'oddeyecircle',
  'oec',
  'olivia-hye',
  'park-chae-won',
  'son-hye-joo',
  'son-hyejoo',
  'sooyoung',
  'vivi',
  'wong-kahei',
  'wong-viian',
  'yeojin',
  'yves',
  'yyxy',
  '이달의소녀'
]

const twitter = baseTags
const tumblr = baseTags.map((tag) => tag.replace(/-/g, ' '))

module.exports = {
  twitter,
  tumblr
}
