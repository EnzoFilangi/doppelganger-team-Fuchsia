const test = require("tape");
const DiscountApplier = require("../discount-applier");

class Notifier {
  constructor() {}

  result = [];
  count = 0;

  notify(user, message) {
    this.result.push(user + " " + message);
    this.count++;
  }
}

test("apply v1", (t) => {
  // TODO: write a test that fails due to the bug in
  // DiscountApplier.applyV1

  let notifier = new Notifier();
  let applier = new DiscountApplier(notifier);
  const discount = 10;
  const users = ["user1", "user2"];
  const goodCallNumber = users.length;

  applier.applyV1(discount, users);

  t.equals(
    notifier.count,
    goodCallNumber,
    `Notifier should be called ${users.length} times but was called ${notifier.count} times`
  );

  t.end();
});

test("apply v2", (t) => {
  let notifier = new Notifier();

  let applier = new DiscountApplier(notifier);

  let discount = 10;
  let users = ["user1", "user2", "user3", "user4"];

  applier.applyV2(discount, users);

  t.equal(notifier.result[0], `user1 You've got a new discount of 10`);
  t.equal(notifier.result[1], `user2 You've got a new discount of 10`);
  t.equal(notifier.result[2], `user3 You've got a new discount of 10`);
  t.equal(notifier.result[3], `user4 You've got a new discount of 10`);

  t.end();
});
