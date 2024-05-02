import { useMemo } from "react";
import { useState, useEffect } from "react";

/**
 * Hook to save data in local storage
 * @param {string} key - key to save data in local storage
 * @param {any} defaultValue - default value to return if no data found in local storage
 * @returns {[any, function]} - returns data and function to save data in local storage
 * @example
 * const [data, setData] = useLocalStorage('user', {name: 'Jane Doe'})
 * setData({name: 'John Doe'})
 * console.log(data) // {name: 'John Doe'}
 */
export function useLocalStorage(propsKey, propsDefaultValue = undefined) {
  const [data, setData] = useState(propsDefaultValue);

  const key = useMemo(() => propsKey, [propsKey]);
  const defaultValue = useMemo(() => propsDefaultValue, [propsDefaultValue]);

  useEffect(() => {
    try {
      const res = JSON.parse(localStorage.getItem(key));
      setData(res);
    } catch (error) {
      console.error(error);
      setData(defaultValue);
    }
  }, [key, defaultValue]);

  const saveData = (newData) => {
    try {
      localStorage.setItem(key, JSON.stringify(newData));
      setData(newData);
    } catch (error) {
      console.error(error);
      setData(defaultValue);
    }
  };

  return [data, saveData];
}
