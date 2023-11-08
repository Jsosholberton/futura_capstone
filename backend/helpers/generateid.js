/**
 * Generates a unique identifier by combining a random number and the current base 32 timestamp.
 * @returns {string} - Generated unique identifier.
 */
const genId = () => {
    const random = Math.random().toString(32).substring(2);
    const date = Date.now().toString(32);
    return random + date
}

/**
 * Exports the genId function as the default value of the module.
 */
export default genId;
