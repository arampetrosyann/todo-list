class flexibleError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

module.exports = flexibleError;
