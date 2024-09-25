import { Todo } from "@/queries/Todo";

export async function getTodos() {
  try {
    const response = await fetch("http://localhost:3001/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export async function createTodo(todo: Omit<Todo, "id">) {
  try {
    const response = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error("Failed to create todo");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export async function updateTodo(todo: Todo) {
  try {
    const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete todo");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
