export const useLocalStorage = <T = unknown>(): [
  (key: string) => T,
  (key: string, value: any) => void,
  () => void
] => {
  const get = (key: string) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "");
    } catch (err) {
      console.log({ err });
      return "";
    }
  };
  const set = (key: string, value: any) =>
    localStorage.setItem(key, JSON.stringify(value));
  const clear = () => localStorage.clear;
  return [get, set, clear];
};
