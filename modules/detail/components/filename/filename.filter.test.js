describe('The filename filter', () => {
    let filenameFilter;

    beforeEach(() => {
        angular.mock.module('dpDetail');

        angular.mock.inject((_filenameFilter_) => {
            filenameFilter = _filenameFilter_;
        });
    });

    it('returns the filename based on a complete URL', () => {
        expect(filenameFilter('http://www.example.com/path/my-file.pdf')).toBe('my-file.pdf');
        expect(filenameFilter('http://www.example.com/this/that/my-file.pdf')).toBe('my-file.pdf');
        expect(filenameFilter('https://www.example.com/la/la/la/la/la/my-file.pdf')).toBe('my-file.pdf');
    });

    it('returns the whole string if it doesn\'t recognize a filename', () => {
        // Trailing slash
        expect(filenameFilter('http://www.example.com/path/')).toBe('http://www.example.com/path/');

        // No extension
        expect(filenameFilter('http://www.example.com/downloads/file.php?id=1234'))
            .toBe('http://www.example.com/downloads/file.php?id=1234');
    });

    it('is case insensitive', () => {
        expect(filenameFilter('http://www.example.com/path/naamloos.txt')).toBe('naamloos.txt');
        expect(filenameFilter('http://www.example.com/path/NAAMLOOS.TXT')).toBe('NAAMLOOS.TXT');
    });
});
