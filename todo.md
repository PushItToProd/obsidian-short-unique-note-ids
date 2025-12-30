- [x] format short IDs
  - [x] date part
  - [x] time part
  - [x] combined

- [ ] (maybe) support more configurable formatting
  - e.g. at least let me pick between `YMD-HHmm` and `YMDHHmm`

- [ ] update README


- [ ] ribbon icon to create unique notes
- [ ] command to create unique notes
- [ ] settings
  - [ ] new file location
  - [ ] template location
  - [ ] unique prefix format
  - [ ] epoch year
- [ ] tool for converting existing unique ID notes to short IDs
  - [ ] make sure to keep the old IDs as aliases (or just add the new IDs as aliase)


- [ ] JavaScript's `Date` is obnoxious - consider an alternative library
  - the month is zero-indexed, but the year and day are not
  - the methods like `getDate()`, etc. return in the local time zone
