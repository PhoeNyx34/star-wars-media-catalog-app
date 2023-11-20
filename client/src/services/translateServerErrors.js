import _ from 'lodash'

let translateServerErrors = (errors) => {
  let serializedErrors = {}

  if (typeof errors === Object) {
    let serializedErrors =
      errors.message
  }

  Object.keys(errors).forEach((key) => {
    const messages = errors[key].map((error) => {
      const field = _.startCase(key)
      if (error.message.includes("already in use")) {
        serializedErrors = {
          ...serializedErrors,
          [field]: "already in use"
        }
      } else {
        serializedErrors = {
          ...serializedErrors,
          [field]: error.message
        }

      }
    })
  });
  return serializedErrors
};

export default translateServerErrors;
