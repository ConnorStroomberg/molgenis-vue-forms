/**
 * Run all validators from a field against all the data in the form
 *
 * @param validators
 * @param value
 * @returns {boolean}
 */
const run = (validators, data) => {
    let valid = true
    validators.forEach(validator => {
      valid = validator(data)
    })
    return valid
}

export default {
  run
}