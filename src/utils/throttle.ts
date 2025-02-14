let waiting = false;

export function throttle(callback: Function, limit: number): VoidFunction {
  return function (this: typeof callback): void {
    if (!waiting) {
      waiting = true;
      callback.apply(this, arguments);

      setTimeout(function () {
        waiting = false;
      }, limit);
    }
  };
}
