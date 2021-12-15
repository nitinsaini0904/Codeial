const express = require('express');
const app = express();

const port = 1000;

app.listen(port,function(err){
  if(err){
    console.log(`Error in running : ${err}`);
    return;
  }

  console.log(`Server is running of port: ${port}`);
})