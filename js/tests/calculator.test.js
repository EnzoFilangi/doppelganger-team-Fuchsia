const Calculator = require('../calculator')

test('should throw when not authorized', () => {
  // TODO: write a test that fails due to the bug in
  // Calculator.divide()

  const mockAuthorizer = {
    authorize: jest.fn(() => false)
  };

  const calculator = new Calculator(mockAuthorizer);

  expect(calculator.divide(1, 2)).toThrow();
})
