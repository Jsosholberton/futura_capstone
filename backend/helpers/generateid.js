/**
 * Generates a unique identifier by combining a random number and the current base 32 timestamp.
 * @returns {string} - Generated unique identifier.
 */
const genId = () => {

    // Generate a random string by converting a random floating-point number to base 32.
    const random = Math.random().toString(32).substring(2);

    // Get the current timestamp in milliseconds and convert it to base 32.
    const date = Date.now().toString(32);

    // Concatenate the random string and the date string to create a unique identifier.
    return random + date
}

/**
 * Exports the genId function as the default value of the module.
 */
export default genId;
