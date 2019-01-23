function getRandomElementName(prefix, complexity) {
    complexity = isNaN(complexity) === true ? 1 : parseInt(complexity);
    complexity = complexity > 32 ? 32 : complexity;
    complexity = complexity < 1 ? 1 : complexity;

    prefix = prefix === undefined ? "" : prefix;
    var randomArray = new Uint32Array(complexity);
    window.crypto.getRandomValues(randomArray);
    return prefix + randomArray.join('_');
}