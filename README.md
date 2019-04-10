# tsc-globalthis-err

**Code**
```
git clone https://github.com/filipesilva/tsc-globalthis-err
cd tsc-globalthis-err
yarn
yarn tsc --target es5 --skipLibCheck --allowJs bundle.js --out out.js
yarn test // this runs the same command as above
```

**Expected behavior:**
No error.

**Actual behavior:**
```
$ tsc --target es5 --skipLibCheck --allowJs bundle.js --out out.js
D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:72970
                throw e;
                ^

TypeError: Cannot read property 'parent' of undefined
    at createUnionOrIntersectionProperty (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:31733:50)
    at getUnionOrIntersectionProperty (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:31746:28)
    at getPropertyOfUnionOrIntersectionType (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:31754:28)
    at getPropertiesOfUnionOrIntersectionType (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:31363:48)
    at getPropertiesOfType (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:31380:17)
    at getSuggestedSymbolForNonexistentProperty (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:41295:93)
    at reportNonexistentProperty (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:41273:38)
    at checkPropertyAccessExpressionOrQualifiedName (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:41132:25)
    at checkPropertyAccessExpression (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:41095:20)
    at checkExpressionWorker (D:\sandbox\tsc-globalthis-err\node_modules\typescript\lib\tsc.js:44380:28)
```

**Additional details:**

This is an odd error. I spent a lot of time trying to cut it down to a simple reproduction but it was very hard.

The error only seems to occur when:
- the code is of some complexity (see `simple.js` and `yarn test-simple`, no error there)
- `@types/node` are also installed (if you remove them from node_modules, there is no error)
- this line is present in the code `_this._cache = _global.$templateCache;` (comment it out and there is no error)

I added some debug logging to the `tsc` functions in the stack trace and it looks like the error is related to `globalThis`, at least that's the `name` in the `createUnionOrIntersectionProperty` call that throws.
