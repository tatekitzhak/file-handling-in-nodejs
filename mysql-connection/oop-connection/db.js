class DB extends EventEmitter {
    constructor() {
      super();
    }
  
    destroy(err) {
    }
  }

/****
 * https://stackoverflow.com/questions/65429178/node-js-class-with-mysql-package-using-oop-principles
 *
 */
  class DB {
    constructor(dbname, dbpassword) {
      this.establishedConnection = null;
      this.dbname = dbname;
      this.dbpassword = dbpassword;
    }
  
    connection() {
      return new Promise((resolve, reject) => {
        resolve(mysql.createConnection({
          host: "localhost",
          user: "root",
          password: this.dbpassword,
          database: this.dbname,
        }))
      })
    }
  
    connect() {
      if (!this.establishedConnection) {
        this.establishedConnection = this.connection().then(res => {
          res.connect(function(err) {
            if (err) {
              this.dropConnection();
              throw err;
            }
            
            console.log(res.state, "connected")
          })
        });
      }
    }
  
    dropConnection() {
      if (this.establishedConnection) {
        this.establishedConnection.then(res => {
          res.end();
          console.log(res.state, 'connection dropped');
        });
        
        this.establishedConnection = null;
      }
    }
  }

  /*****
   * https://blog.logrocket.com/design-patterns-in-node-js/
   * 
   */

  class Employee {

    speak() {
     return "Hi, I'm a " + this.type + " employee"
    }

}

class FullTimeEmployee extends Employee{
    constructor(data) {
     super()
     this.type = "full time"
     //....
    }
}


class PartTimeEmployee extends Employee{
    constructor(data) {
     super()
     this.type = "part time"
     //....
    }
}


class ContractorEmployee extends Employee{
    constructor(data) {
     super()
     this.type = "contractor"
     //....
    }
}

class MyEmployeeFactory {

    createEmployee(data) {
     if(data.type == 'fulltime') return new FullTimeEmployee(data)
     if(data.type == 'parttime') return new PartTimeEmployee(data)
     if(data.type == 'contractor') return new ContractorEmployee(data)
    }
}

const driver = require("...")

let instance = null


class DBClass {

    constructor(props) {
     this.properties = props
     this._conn = null
    }

    connect() {
     this._conn = driver.connect(this.props)
    }

    get conn() {
     return this._conn
    }

    static getInstance() {
     if(!instance) {
         instance = new DBClass()
     }

     return instance
    }
}

class Cat {
  db_connection() {
      let db_name= this.constructor.name;
    //return `${this.constructor.name}: Meowww`;
    return {db:db_name}
  }
}

// exports = Cat; // It will not work with `new Cat();`
// exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
module.exports = Cat;

module.exports = DBClass