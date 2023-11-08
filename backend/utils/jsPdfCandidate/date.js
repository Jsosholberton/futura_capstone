/**
 * Formats a date into a more human-readable format.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date as a string, e.g., "October 25th 2023".
 */
function formatDate(date) {
  // Define an array of month names
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get the day, month, and year components from the date
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Calculate the day with the appropriate suffix using the getDayWithSuffix function
  const dayWithSuffix = getDayWithSuffix(day);

  // Return the formatted date as a string, e.g., "October 25th 2023"
  return `${month} ${dayWithSuffix} ${year}`;
}

/**
 * Adds suffixes to day numbers (e.g., "st", "nd", "rd", or "th").
 *
 * @param {number} day - The day number to which a suffix is added.
 * @returns {string} The day with the appropriate suffix.
 */
function getDayWithSuffix(day) {
  // Define an array of suffixes for day numbers
  const suffixes = ['th', 'st', 'nd', 'rd'];

  // Check for special cases where "th" should be used (11th, 12th, 13th)
  if (day >= 11 && day <= 13) {
    return day + 'th';
  } else {
    // Calculate the last digit of the day
    const lastDigit = day % 10;

    // Use the appropriate suffix or default to "th"
    return day + (suffixes[lastDigit] || 'th');
  }
}

/**
 * Creates a new Date object for the current date and formats it.
 *
 * @type {Date} currentDate - A new Date object for the current date.
 * @type {string} format - The formatted date as a string.
 */
const currentDate = new Date();
const format = formatDate(currentDate);

/**
 * Exports the formatted date for use in other parts of the application.
 */
export {
  format,
};
