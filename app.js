const express = require("express");
const app = express();
app.use(express.json());
module.exports = app;
var addDays = require("date-fns/addDays");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "todoApplication.db");
let db = null;

const initilizeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB Error : ${e.message}`);
    process.exit(1);
  }
};

initilizeDbAndServer();

// API 1

const hasStatusProperty = (requestQuery) => {
  return requestQuery.status !== undefined;
};
const hasPriorityProperty = (requestQuery) => {
  return requestQuery.priority !== undefined;
};
const hasPriorityAndStatusProperty = (requestQuery) => {
  return requestQuery.status && requestQuery.priority !== undefined;
};

const hasSearchProperty = (requestQuery) => {
  return requestQuery.search_q !== undefined;
};

const hasCategoryAndStatusProperty = (requestQuery) => {
  return requestQuery.status && requestQuery.category !== undefined;
};

const hasCategoryProperty = (requestQuery) => {
  return requestQuery.category !== undefined;
};

const hasCategoryAndPriorityProperty = (requestQuery) => {
  return requestQuery.priority && requestQuery.category !== undefined;
};

app.get("/todos/", async (request, response) => {
  let data;
  let getTodoQuery = "";
  const { status, priority, category, search_q } = request.query;
  switch (true) {
    case hasStatusProperty(request.query):
      getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                status LIKE '${status}';
            `;
      const result1 = await db.all(getTodoQuery);
      response.send(result1);
      break;
    case hasPriorityProperty(request.query):
      getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                priority LIKE '${priority}';
            `;
      const result2 = await db.all(getTodoQuery);
      response.send(result2);
      break;
    case hasPriorityAndStatusProperty(request.query):
      getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                priority LIKE '${priority}'
                AND status LIKE '${status}';
            `;
      const result3 = await db.all(getTodoQuery);
      response.send(result3);
    case hasSearchProperty(request.query):
      getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                todo LIKE '${search_q}';
            `;
      const result4 = await db.all(getTodoQuery);
      response.send(result4);
    case hasCategoryAndStatusProperty(request.query):
      getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                category LIKE '${category}'
                AND status LIKE '${status}';
            `;
      const result5 = await db.all(getTodoQuery);
      response.send(result5);
    case hasCategoryProperty(request.query):
      getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                category LIKE '${category}';
            `;
      const result6 = await db.all(getTodoQuery);
      response.send(result6);
    case hasCategoryAndPriorityProperty(request.query):
      getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                category LIKE '${category}'
                AND priority LIKE '${priority}'
                ;
            `;
      const result7 = await db.all(getTodoQuery);
      response.send(result7);

    default:
      response.send(400);
      break;
  }
});

//API 2

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                id = ${todoId};
            `;
  const result = await db.get(getTodoQuery);
  response.send(result);
});

// API 3

app.get("/agenda/", async (request, response) => {
  const { date } = request.query;
  const getTodoQuery = `
            SELECT
                id,
                todo, 
                category, 
                priority,
                status,
                due_date AS dueDate
            FROM 
                todo
            WHERE 
                due_date = ${date};
            `;
  const result = await db.get(getTodoQuery);
  response.send(result);
});

//API 4

app.post("/todos/", async (request, response) => {
  const { id, todo, priority, status, category, dueDate } = request.body;
  const postTodoQuery = `
    INSERT INTO 
        todo(id, todo, priority, status, category, due_date)
    VALUES 
        (
            ${id},
            '${todo}',
            '${priority}',
            '${status}',
            '${category}',
            '${dueDate}'
        );
    `;
  const result = await db.run(postTodoQuery);
  response.send("Todo Successfully Added");
});

// API 5

app.put("/todos/:todoId/", async (request, response) => {
  switch (key) {
    case value:
      break;

    default:
      break;
  }
});
