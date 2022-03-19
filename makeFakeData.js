const { faker } = require('@faker-js/faker');
const fs = require('fs')

// https://github.com/faker-js/faker

const makeMessages = function (groupName, numberOfMessages) {

  messagesList = []
  for (let i = 0; i < numberOfMessages; i++) {
    newMessage = {
      'id': i,
      'userName': faker.hacker.adjective() + faker.hacker.noun(),
      'email': faker.internet.email(),
      'date': faker.date.recent(10, new Date()),
      'body': faker.hacker.phrase(),
      'groupName': groupName
    }
    messagesList.push(newMessage)
  }
  return messagesList;
}

let groupNames = ['javascript', 'python', 'math', 'science', 'history']
let admins = ['bj']
let groups = []

for (let i = 0; i < groupNames.length; i++) {

  let newGroup = {
    'groupName': groupNames[i],
    'messages': makeMessages('javascript', 100),
    'admins': admins
  }

  groups.push(newGroup)
}

/*
let groups = [
  {
    'groupName': 'javascript',
    'messages': makeMessages('javascript', 100),
    admins: ['BJ']
  },
  {
    'groupName': 'python',
    'messages': makeMessages('python', 100),
    admins: ['BJ']
  },
  {
    'groupName': 'math',
    'messages': makeMessages('math', 100),
    admins: ['BJ']
  },
  {
    'groupName': 'science',
    'messages': makeMessages('science', 100),
    admins: ['BJ']
  },
  {
    'groupName': 'history',
    'messages': makeMessages('history', 100),
    admins: ['BJ']
  }
]

*/

let groupsAsJSON = JSON.stringify(groups, null, 2)
fs.writeFile('./fakeData.json', groupsAsJSON, err => {
  if (err) {
    console.error(err)
    return
  }
})

//old way of generating data (without fs)
//on the console, do 'node makeFakeData.js > fakeData.json'
//console.log(JSON.stringify(groups, null, 2));