import { describe, it, beforeEach, before, afterEach, mock } from 'node:test'
import { deepStrictEqual } from 'node:assert'
import { setTimeout } from 'node:timers/promises'
import { CallTracker } from 'node:assert'

const tracker = new CallTracker()

function sum(a, b) {
  return a + b
}

const timer = {
  delay(ms) {
    return setTimeout(ms)
  }, 
  async sumDelayed(num1, num2) {
    await timer.delay(1000)

    return sum(num1, num2)
  }
}

describe('Using Node.js only!!', () => {
  // beforeEach(() => {
  //   // geralmente para limpar o estado
  //   console.log('vou rodar antes de cada teste!')
  // })

  // afterEach(() => {
  //   console.log('vou rodar depois de cada teste!')
  // })

  // before(() => {
  //   console.log('vou rodar antes de todos os testes!')
  // })

  it.todo('it should sum tow values', () => {
    const expected = 10
    const current = sum(5, 5)

    deepStrictEqual(current, expected)
  })

  it.skip('it should sum values after a second', async (context) => {    
    // Isso é um SPY = monitorar as chamadas de uma função
    context.mock.method(timer, timer.delay.name)

    const result = await timer.sumDelayed(4, 5)

    console.log('exected!!', result)

    deepStrictEqual(timer.delay.mock.length, 1)
    deepStrictEqual(timer.delay.mock.calls[0].argumentsm, [1000])
    deepStrictEqual(result, 9);
  })

  it('it should sum values after a second using callTracker', async () => {


    timer.delay = tracker.calls(timer.delay)

    const result = await timer.sumDelayed(4, 5)
    const [{ arguments: delayArguments }] = tracker.getCalls(timer.delay)


    deepStrictEqual(delayArguments, [1000])
    deepStrictEqual(result, 9);
  })
})