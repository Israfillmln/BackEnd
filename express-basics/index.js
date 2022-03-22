const express = require("express")
const app = express();

const PORT = 2000

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my Express API</h1>")
})

const users = [
  {
    id: 1,
    username: "seto",
    email: "seto@mail.com"
  },
  {
    id: 2,
    username: "mark",
    email: "mark@mail.com"
  },
  {
    id: 3,
    username: "bill",
    email: "bill@mail.com"
  },
  {
    id: 4,
    username: "steve",
    email: "steve@mail.com"
  },
]

app.get("/users", (req, res) => {
  console.log(req.query.email);

  if (users.length) {
    res.status(200).json({
      message: "Users fetched successfully",
      result: users
    })
  } else {
    res.status(404).send("No users found")
  }
})

app.post("/users", (req, res) => {
  const data = req.body;

  if (!data.username) {
    res.status(400).json({
      message: "User data is required"
    })
    return;
  }

  users.push(data)

  res.status(201).json({
    message: "Added user",
    result: data
  })
})

app.delete("/users/:userId", (req, res) => {
  const userId = req.params.userId

  const findIndex = users.findIndex((val) => {
    return val.id == userId
  })

  if (findIndex == -1) {
    res.status(400).json({
      message: `User with ID ${userId}, not found`
    })
    return
  }

  users.splice(findIndex, 1)

  res.status(200).json({
    message: "User deleted"
  })
})

app.listen(PORT, () => {
  console.log("Server running in port", PORT)
})
