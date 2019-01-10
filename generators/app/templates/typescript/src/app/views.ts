const views = (() => {
  return {
    Intent: {
      Help: {
        say: "Some help text here."
      },
      Launch: {
        tell: "Welcome!"
      }
    }
  };
})();

export default {
  en: {
    translation: views
  }
};
