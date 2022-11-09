const sender = require('../mail-sender')

test('send v1', () => {
  // TODO: write a test that fails due to the bug in
  // MailSender.sendV1

  const mockHttpClient = {
    post: jest.fn()
  };
  const user = {
    name: "Alice",
    email: "alice@foo.com"
  };
  const message = "Hello, world !";
  const mailSender = new sender.MailSender(mockHttpClient);

  mailSender.sendV1(user, message);

  // Expect the POST request to be done
  expect(mockHttpClient.post).toHaveBeenCalled();
  // Expect the parameters to be correct
  expect(mockHttpClient.post.mock.calls[0][0]).toEqual(mailSender.baseUrl);
  expect(mockHttpClient.post.mock.calls[0][1].name).toEqual(user.name);
  expect(mockHttpClient.post.mock.calls[0][1].email).toEqual(user.email);
  expect(mockHttpClient.post.mock.calls[0][1].message).toEqual(message);
})

test('send v2', () => {
  // TODO: wrte a test that fails due to the bug in
  // MailSender.sendV2

  const mockHttpClient = {
    post: jest.fn(() => {
      return {code: 503}
    })
  };
  const user = {
    name: "Bob",
    email: "bob@bar.com"
  };
  const message = "Hi !";
  const mailSender = new sender.MailSender(mockHttpClient);

  mailSender.sendV2(user, message);

  // Expect the retry to work
  expect(mockHttpClient.post).toHaveBeenCalled();
  expect(mockHttpClient.post.mock.calls.length).toEqual(2);
  // Expect the parameters of the first call to be correct
  expect(mockHttpClient.post.mock.calls[0][0]).toEqual(mailSender.baseUrl);
  expect(mockHttpClient.post.mock.calls[0][1].name).toEqual(user.name);
  expect(mockHttpClient.post.mock.calls[0][1].email).toEqual(user.email);
  expect(mockHttpClient.post.mock.calls[0][1].message).toEqual(message);
  // Expect the parameters of the second call to be correct as well
  expect(mockHttpClient.post.mock.calls[1][0]).toEqual(mailSender.baseUrl);
  expect(mockHttpClient.post.mock.calls[1][1].name).toEqual(user.name);
  expect(mockHttpClient.post.mock.calls[1][1].email).toEqual(user.email);
  expect(mockHttpClient.post.mock.calls[1][1].message).toEqual(message);
})
