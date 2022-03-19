const { faker } = require('@faker-js/faker');

let roomNames = ['javascript', 'python', 'history']

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

//on the console, do 'node makeFakeData.js > fakeData.json'
console.log(JSON.stringify(groups, null, 2));