import axios from "axios";

const BASEURL = "https://randomuser.me/api/?results=50&nat=us";
// const BASEURL = "https://jsonplaceholder.typicode.com/users";

export default {
  search: () => {return axios.get(BASEURL)}
}