const {  describe, it, before, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')

const Todo = require('../src/todo')


describe('todo', () => {
  describe('#isValid', () => {
    let sandbox

    beforeEach(() => {
      sandbox = createSandbox()
    })

    afterEach(() => sandbox.restore())

    it('should return invalid when creating an object without text', () => {
      const data = {
        text: '',
        when: new Date("2020-12-01")
      }

      const todo = new Todo(data)
      const result = todo.isValid()

      expect(result).to.be.not.ok
    })

    it('should return invalid when creating an object without "when" property invlid', () => {
      const data = {
        text: 'Hello World',
        when: new Date("20-12-01")
      }

      const todo = new Todo(data)
      const result = todo.isValid()

      expect(result).to.be.not.ok
    })

    it('should have "id", "text", "when" and "status" properties after creating object', () => {
      const data = {
        text: 'Hello World',
        when: new Date("2020-12-01")
      };
    
      const uuid = require('uuid');
      const expectedId = '000001';
      
      // Stub the uuid.v4 function to return the expectedId
      const uuidStub = sandbox.stub(uuid, 'v4').returns(expectedId);
  
      const todo = new Todo(data);
      
      const expectedItem = {
        text: data.text,
        when: data.when,
        status: "",
        id: expectedId
      };
      
      const result = todo.isValid();
      
      expect(result).to.be.ok;
      expect(uuid.v4.calledOnce).to.be.ok;
      expect(todo).to.be.deep.equal(expectedItem);
    
      // Restore the original behavior of uuid.v4
      uuidStub.restore();
    });
  })
})