class Users {
  constructor() {
    this.value = {};
    this.loggedInUser = [];
    // this.addUsers=this.addUsers.bind(this);
  }
  login(user) {
    const { userName, password } = user || {};
    if (userName && password) {
      const value = this.value[userName];
      if (value && value.password === password) {
        this.loggedInUser.push(userName);
        return { status: "Success" };
      }
    }
    return { status: "Failure" };
  }
  addUsers(user) {
    const { userName, password } = user || {};
    if (
      userName &&
      password &&
      Object.keys(this.value).indexOf(userName) === -1
    ) {
      this.value[userName] = user;
      return { status: "Success" };
    }
    return { status: "Failure" };
  }
  getLoggedInUsers() {
    return this.loggedInUser;
  }
  isLoggedIn(){
      
  }
  getUsers() {
    return Object.keys(this.value);
  }
}
const users = new Users();
export default users;
