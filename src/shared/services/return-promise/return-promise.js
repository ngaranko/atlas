const returnPromise = (fn, ...fnProps) => Promise.resolve(fn(...fnProps));

export default returnPromise;
