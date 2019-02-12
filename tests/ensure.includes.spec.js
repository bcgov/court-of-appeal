let { expect } = require('chai')
var fs = require('fs')
var api = fs.readFileSync('./public/js/add.includes.if.missing.js').toString();
var addIncludesIfMissing = (new Function( api + '; return addIncludesIfMissing;'))();

describe('Array.includes', ()=>{

    let old
    beforeEach(()=>{
        old = Array.prototype.includes
    })
    afterEach(()=>{
        Array.prototype.includes = old
    })

    it('is preserved', ()=>{
        Array.prototype.includes = (item)=>{
            return 'stay yourself'
        }
        addIncludesIfMissing()

        expect(['any', 'thing'].includes('works')).to.equal('stay yourself')
    })
    it('is added when missing', ()=>{
        Array.prototype.includes = undefined
        addIncludesIfMissing()

        expect(['any', 'thing'].includes('stuff')).to.equal(false)
        expect(['any', 'thing'].includes('thing')).to.equal(true)
    })
})
