// This code defines a JavaScript function named genId.
const genId = () => {

    // Generate a random string by converting a random floating-point number to base 32.
    const random = Math.random().toString(32).substring(2);

    // Get the current timestamp in milliseconds and convert it to base 32.
    const date = Date.now().toString(32);

    // Concatenate the random string and the date string to create a unique identifier.
    return random + date
}

export default genId;
