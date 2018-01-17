const suppress = () => {
  let suppressing = false;

  return {
    isBusy: () => suppressing,
    start: (period = 100) => {
      suppressing = true;
      window.setTimeout(() => {
        suppressing = false;
      }, period);
    }
  };
};

export default suppress();

window.suppress = suppress();
