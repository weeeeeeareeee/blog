module.exports = function loader(source) {
    console.log(source)
    return `module.exports = ${JSON.stringify(source)}`;
};