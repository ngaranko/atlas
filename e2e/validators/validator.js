module.exports = function (state, page) {
    dp.availableStates[state].validator(page);
};
