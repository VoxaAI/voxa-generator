const views = (function views() {
  return {
    Intent: {
      Launch: {
        tell: "Welcome!"
      },
      Help: {
        say: "Some help text here."
      }
    }
  };
})();

export = {
  en: {
    translation: views
  }
};
