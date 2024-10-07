import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const todayTasks = tasks.filter((task) => task.type === "today" )
  res.render("index.ejs", { tasks: todayTasks, todayLength: todayTasks.length,});
});

app.get("/important", (req, res) => {
  const importantTasks = tasks.filter((task) => task.type === "important");
  res.render("important.ejs", { tasks: importantTasks, importantLength: importantTasks.length });
});
app.get("/planned", (req, res) => {
  const plannedTasks = tasks.filter((task) => task.type === "planned");
  res.render("planned.ejs", { tasks: plannedTasks, plannedLength: plannedTasks.length });
}); 
app.get("/completed" , (req,res) => {
  res.render("completed.ejs", {
    tasks :completedTasks
  })
})

var tasks = [];
var completedTasks = []

app.post("/complete-task", (req,res) => {
  var taskTitle = req.body["task-title"]
  var taskInput = req.body["task"]
  var taskType = req.body["type"];
  var taskPriority = req.body["priority"]
  tasks = tasks.filter(task => !(task.title === taskTitle && task.task === taskInput));
  completedTasks.push({ title: taskTitle, task: taskInput, type: taskType, priority: taskPriority});
  console.log(completedTasks)
  if (taskType === "today") {
    res.redirect("/")
  } else {
    res.redirect(`/${taskType}`);
  }

})

app.post("/submit", (req, res) => {
  var taskTitle = req.body["task-title"]
  var taskInput = req.body["task"];
    var taskType = req.body["type"];
    var taskPriority = req.body["priority"]
    var taskTime = req.body["time"]
    var taskDate = req.body["date"]
      if (tasks) {
    tasks.push({ title : taskTitle, task: taskInput, type: taskType, priority: taskPriority, time: taskTime, date: taskDate });
   } else{
    
   } 
  if (taskType === "today") {
    res.redirect("/")
  } else {
    res.redirect(`/${taskType}`);
  }  
  
  
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
