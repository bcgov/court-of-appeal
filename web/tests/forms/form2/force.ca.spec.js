const { expect } = require('chai')
const { forceCA } = require('../../../src/forms/form2/force-ca')

describe('force.ca', ()=>{

    it('accepts numbers', (done)=>{
        let o = {
            setState: (state)=>{
                expect(state.caseNumber).to.equal('CA5')
                done()
            }
        }
        forceCA('CA5', o)
    })
    it('rejects letters', (done)=>{
        let o = {
            setState: (state)=>{
                expect(state.caseNumber).to.equal('CA')
                done()
            }
        }
        forceCA('CAa', o)
    })
    it('forces prefix', (done)=>{
        let o = {
            setState: (state)=>{
                expect(state.caseNumber).to.equal('CA15')
                done()
            }
        }
        forceCA('15', o)
    })
    it('limits to 7 digits', (done)=>{
        let o = {
            setState: (state)=>{
                expect(state.caseNumber).to.equal('CA12345')
                done()
            }
        }
        forceCA('123456', o)
    })
})
