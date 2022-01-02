class Datebase {
    db_connection() {
        let db_name= this.constructor.name;
      //return `${this.constructor.name}: Meowww`;
      return {db:db_name}
    }
  }
  
  // exports = Cat; // It will not work with `new Cat();`
  // exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
  module.exports = Datebase;