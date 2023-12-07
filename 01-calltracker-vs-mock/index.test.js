import { describe, it, before } from 'node:test'


describe('Using Node.js only!!', () => {
  before(() => {
    // geralmente para limpar o estado
    console.log('vou rodar antes de cada teste!')
  })

  it.todo('it should sum tow values')
})