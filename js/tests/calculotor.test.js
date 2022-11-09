const test = require('tape')
const Calculator = require('../calculator')

test('should throw when not authorized', (t) => {
  // TODO: write a test that fails due to the bug in

  const numerator = 15
  const denominator = 5


  const auth = {
    authorize:
      () => false
  }
  const test = new Calculator(auth)

  const caller = () => test.divide(numerator, denominator)
  t.throws(caller)


  t.end()
})
