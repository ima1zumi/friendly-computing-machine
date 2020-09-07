#!/usr/bin/env node

const fetch = require('node-fetch')
const argv = require('minimist')(process.argv.slice(2))

async function countParticipation (name) {
  const response = await fetch(`https://connpass.com/api/v1/event/?nickname=${name}`)
  const json = await response.json()
  console.log(`${name}さんのイベント参加合計回数は${json.results_available}回です。`)
}

async function countParticipationInYearsAndMonths (name, y, m) {
  const response = await fetch(`https://connpass.com/api/v1/event/?nickname=${name}&ym=${y}${m}`)
  const json = await response.json()
  console.log(`${name}さんは${y}年${m}月のイベントに${json.results_available}回参加予定です。`)
}

function exec () {
  console.log('connpassのユーザーネームを入力してください。')
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  let inputString = ''

  process.stdin.on('data', function (chunk) {
    inputString += chunk
  })

  process.stdin.on('end', function () {
    const name = inputString.split('\n')[0]
    if (argv.y && argv.m) {
      countParticipationInYearsAndMonths(name, argv.y, argv.m)
    } else {
      countParticipation(name)
    }
  })
}

exec()

