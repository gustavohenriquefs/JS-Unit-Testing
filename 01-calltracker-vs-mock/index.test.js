import { describe, it, beforeEach, before, afterEach } from 'node:test'
import { deepStrictEqual } from 'node:assert'

function sum(a, b) {
  return a + b
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


  it.skip('it should sum three values')

  it('it should sum four values', { only: true })
})