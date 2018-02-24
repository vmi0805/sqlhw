const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  user: "root",
  password: "root",
  database: "bamazon"
})

// Connect
connection.connect(function(err) {
  if (err) throw err;
})

// Welcome prompt 
console.log("\n");  
console.log("Welcome to Bamazon!\n");

// Select all items from database
	
	connection.query("SELECT * FROM products", function(err, res) {

	let list = new Array;
	
	if (err) throw err;

// display items and create array of items
	for (let i = 0; i < res.length; i++){
		console.log("Item Id.#->" + res[i].item_id + "   Item Name-> " + res[i].product_name + "   Price-> $" + res[i].price_sold + "\n");
		list.push(res[i].item_id);
	}
		runInquirer(list)
	})

//execute buyprompt
function runInquirer(list){

	// console.log(list)

	inquirer
		.prompt([
			{
				type: "list",
				message: "Which item do you want to buy?",
				choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
				name: "buy_list"
			},
			{
				type: "input",
				message: "How many would you like to buy?",
				name: "boughtAmount",
			}
		])
		.then(function(answers) {

			console.log(answers.buy_list);
			console.log(answers.boughtAmount);

			let query = "SELECT * FROM products WHERE item_id = ?"

			connection.query(query, [answers.buy_list], function(err, res) {

				let currentInventory = res[0].inventory_amount;

				if (answers.boughtAmount < currentInventory){

					console.log("Sale approved.");

					updateInventory(answers.buy_list, answers.boughtAmount)

				} else {
					console.log("Your purchase request was NOT approved.  We do not have enough inventory.");
					confirmprompt();				
				}
			})
		})
}

	function updateInventory(itemNum, boughtAmount){

		query = "UPDATE products SET inventory_amount = inventory_amount - ? WHERE item_id = ?"
		connection.query(query, [boughtAmount], [itemNum], function(err, res){

			if (err) throw err;

			console.log("Inventory updated.");
			console.log("The new inventory amount is " + res[0].inventory_amount)
		})
	}

	function confirmprompt(){
		inquirer
		  .prompt([
		    {
		      type: "confirm",
		      message: "Would you like to buy an item?",
		      name: "moreitems"
		    },
		  ])
		  .then(function(inquirerResponse) {
		  		if (inquirerResponse.moreitems){
		  			runInquirer();
		  		} else {
		  			console.log("\n");
		  			console.log("Goodbye.\n");
		  			connection.end();
		  		}
			})
	}


// Node application

// First will display all available items (ids, prices, name)

// Prompt user for  (1) ID of product THEN (2) the desired quantity THEN (END) Complete the order

// Check SQL database for sufficient quantity, EITHER (1) Sufficient [approve order] OR (2) Insufficient [prevent order]

// Approve order = reduce quantity // show customer total cost of their purchases // 

// Create a README.md file