import axios from "axios";
const dataFetcher = async (word) => {
  const { data } = await axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .catch((err) => err.response);
  return data;
};

export default dataFetcher;
