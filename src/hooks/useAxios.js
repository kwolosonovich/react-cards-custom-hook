import {useState, useEffect} from "react";
import axios from "axios";


const useAxios = (item, url) => {
  // get responses (card list) from local storage 
  const [response, setResponse] = useLocalStorage(item)

//   const addItem = async () => {
//     const responseAPI = await axios.get(url);
//     setResponse(...response, responseAPI.data);
//   };
//   return [response, addItem ];
// }

  const addItem = async (formatter = (data) => data) => {
    const responseAPI = await axios.get(url);
    setResponse((data) => [...data, formatter(responseAPI.data)]);
  };
}

const useLocalStorage = (item, initialValue = []) => {
    // get current list of cards
    if (localStorage.getItem(item)) {
        initialValue = JSON.parse(localStorage.getItem(item))
    }
     // setting your initialValue to whatever is in the localstorage, and parsing it as json
    const [value, setValue] = useState(initialValue);

    // every time a new key is added, useEffect will be save card to local storage
    useEffect(() => {
        localStorage.setItem(item, JSON.stringify(value));
    }, [value, item]);

  // return value to useAxios - array of cards
  return [value, setValue];
}


// export default useLocalStorage;

// export {useAxios, useLocalStorage}

export default useAxios; 