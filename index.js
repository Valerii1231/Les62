import mongoose from "mongoose";
import express from "express";
import { Product } from "./model/product.js";
import {  Customer } from "./model/customer.js";
const app = express();
const PORT = 8000;
const url = "mongodb://127.0.0.1:27017/shop";
let html = '<h1>User purchases:</h1>';

mongoose.connect(url) 
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`DB connection error: ${err}`);
  });

  app.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      const customers = await Customer.find();
      html += customers.map((customer) => {
        const product = products.find((product) => product._id.toString() === customer.product_id.toString());        
        return `        
          <div style = "border: 1px solid #000; 
                        width: fit-content; 
                        margin: 0 0 10px 0; 
                        padding: 0 10px;
                        ">            
            <pre>${customer.name}:   ${product.title}    Price: ${product.price}</pre>           
          </div>
        `;      
      }).join("");
    res.send(html);
  } catch (err) {
    console.log(err);
  }
});

  