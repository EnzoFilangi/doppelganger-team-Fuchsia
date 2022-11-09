const test = require('tape')
const DiscountApplier = require('../discount-applier');

class Notifier {
  constructor () {
  }

  result = '';

  notify (user,message) {
    this.result = user + ' ' + message;
  }
}

test('apply v1', (t) => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV1
  t.end()
})

test('apply v2', (t) => {

  let notifier = new Notifier();

  let applier = new DiscountApplier(notifier);

  let discount = 10;
  let users = ['user1','user2','user3','user4'];

  applier.applyV2(discount,users);

  t.equal(notifier.result,`user4 You've got a new discount of 10`);

  t.end()
})
