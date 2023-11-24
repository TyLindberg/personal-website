// Referenced from three.js here: https://github.com/mrdoob/three.js/blob/4527c3e8498ebdc42e7eb40fcfa90435b9c95514/src/core/Clock.js#L70C1-L70C1
export const now = (): number => {
  return (typeof performance === 'undefined' ? Date : performance).now();
};
