import * as express from "express"

const DEFAULT_PORT = 3000;
class App {
  public application : express.Application;
  constructor(){
    this.application = express();
  }
}
const app = new App().application;
app.get("/api/blocks",(req : express.Request , res : express.Response) =>{
  res.send("Block");
})
app.post("/api/mine",(req : express.Request , res : express.Response) =>{
  res.send("Mined");
})

const PORT = DEFAULT_PORT;
app.listen(PORT, ()=>console.log(`Listening On: http://localhost:${PORT}`));