const { expect } = require('chai');
const postcodeToCouncil = require('../../app/helpers/postcodeToCouncil');

describe('postcodeToCouncil', function () {
    it('is a function', function () {
        expect(postcodeToCouncil).to.be.a('function');
    });
    it('returns invalid postcode for incorrect entry', () => {
        expect(postcodeToCouncil('M24 10PP')).to.eql('Invalid postcode');
        expect(postcodeToCouncil('MPPP')).to.eql('Invalid postcode');
        expect(postcodeToCouncil('M24 1OPPP')).to.eql('Invalid postcode');
    });
});

describe('GET council from postcode DB', function () {
    it('returns correct council for postcode', () => {
        postcodeToCouncil('M1 1RD').then((council) => {
            expect(council).to.equal('manchester')
        });
    });
    it('returns correct council for postcode', () => {
        postcodeToCouncil('M24 1RD').then((council) => {
            expect(council).to.equal('oldham')
        });
    });
    it('returns correct council for postcode', () => {
        postcodeToCouncil('BL9 1QP').then((council) => {
            expect(council).to.equal('bury')
        });
    });
    it('returns correct council for postcode', () => {
        postcodeToCouncil('SK3 1WE').then((council) => {
            expect(council).to.equal('stockport')
        });
    });
    it('returns correct council for postcode', () => {
        postcodeToCouncil('WN3 3SP').then((council) => {
            expect(council).to.equal('wigan')
        });
    });
});


