const { getPathDataBase, getPathRuta } = require('./config.const')


describe('#Config', () => {

    describe('getPathRuta', () => {

        test('#getPathRuta ', () => {
            expect(getPathRuta()).toEqual('')
        });
    });
});