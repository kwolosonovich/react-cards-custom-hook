import { useState, useEffect } from "react";
import axios from "axios";
import uuid from "uuid";

const useAxios = (item, url) => {
  // get responses (card list) from local storage
  const [responses, setResponses] = useLocalStorage(item);


  const addResponseData = async (
    formatter = (data) => data,
    restOfUrl = "",
    id = uuid()
  ) => {
    const response = await axios.get(`${url}${restOfUrl}`);
    setResponses((data) => [...data, formatter(response.data)]);
  };

  return [responses, addResponseData];
};

const useLocalStorage = (item, initialValue = []) => {
  // get current list of cards
  if (localStorage.getItem(item)) {
    initialValue = JSON.parse(localStorage.getItem(item));
  }
  // setting your initialValue to whatever is in the localstorage, and parsing it as json
  const [value, setValue] = useState(initialValue);

  // every time a new key is added, useEffect will be save card to local storage
  useEffect(() => {
    localStorage.setItem(item, JSON.stringify(value));
  }, [value, item]);

  // return value to useAxios - array of cards
  return [value, setValue];
};

export default useAxios;
