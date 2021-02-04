let { expect } = require('chai')
import findCaseById from '../../src/helpers/find.case.by.id'

describe('Find by case id', ()=>{
    it('is available', ()=>{
        expect(findCaseById).not.to.equal(undefined)
    })

    it('returns matching case', (done)=>{
        let options = {
            id:15,
            cases:[
                { id:42, name:'answer' },
                { id:15, name:'perfect' }
            ]
        }
        findCaseById(options, (found)=>{
            expect(found.name).to.equal('perfect')
            done()
        })
    })
})
