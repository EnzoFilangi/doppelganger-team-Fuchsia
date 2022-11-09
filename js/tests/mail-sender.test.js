const sender = require('../mail-sender')
const test = require('tape')

class mockHttpClient {
  constructor() {
    this.postMethodCallCounter = 0;
    this.url = "";
    this.request = "";
  }

  post(url, request) {
    this.postMethodCallCounter++;
    this.url = url;
    this.request = request;
  }
}

test('send v1', (t) => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV1

  const mock = new mockHttpClient();
  const user = {
    name: "Alice",
    email: "alice@foo.com"
  };
  const message = "Hello, world !";
  const mailSender = new sender.MailSender(mock);

  mailSender.sendV1(user, message);

  // Because of the nature of the bug, we expect these two tests to fail
  t.equal(mock.request.name, user.name, "User's name should be correct in the request");
  t.equal(mock.request.email, user.email, "User's email should be correct in the request");
  // These tests should pass
  t.equal(mock.request.message, message, "User's message should be correct in the request");
  t.equal(mock.url, mailSender.baseUrl, "Url should be the class' default");
  t.equal(mock.postMethodCallCounter, 1, "sendV1() should POST the message once and only once");

  t.end();
})

test('send v2', (t) => {
  // TODO: wrte a test that fails due to the bug in
  // MailSender.sendV2
  t.end()
})
