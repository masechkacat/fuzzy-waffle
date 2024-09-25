import { cn } from "@/lib/utils";

// types
import { Todo } from "@/queries/Todo";

// utils
import { urgencyMap } from "@/utils/urgencyMap";

// hooks
import { useTodos } from "@/queries/useTodos";

// components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export function Todos() {
  const { useGetTodos, useUpdateTodo, useDeleteTodo } = useTodos();
  const { data, isLoading, error } = useGetTodos();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  const handleToggleCompleted = (todo: Todo) => {
    updateTodo({ ...todo, completed: !todo.completed });
  };

  const handleToggleUrgency = (todo: Todo) => {
    const urgencies = ["low", "medium", "high"];
    const currentIndex = urgencies.indexOf(todo.urgency);
    const nextIndex = (currentIndex + 1) % urgencies.length;
    const nextUrgency = urgencies[nextIndex] as Todo["urgency"];
    updateTodo({ ...todo, urgency: nextUrgency });
  };

  return (
    <div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>{data?.length} todos</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {data?.map(todo => (
            <p
              key={todo.id}
              className="flex items-center gap-4 border-b-2 pb-2"
            >
              <label
                onClick={() => handleToggleCompleted(todo)}
                className="flex items-center gap-4"
              >
                <Checkbox checked={todo.completed} />
                <span
                  className={cn(
                    "cursor-pointer",
                    todo.completed
                      ? "line-through text-gray-500"
                      : "no-underline"
                  )}
                >
                  {todo.title}
                </span>
              </label>
              <span
                className={cn(
                  "rounded-full w-3 h-3 cursor-pointer",
                  urgencyMap[todo.urgency]
                )}
                onClick={() => handleToggleUrgency(todo)}
              />
              <Button
                className="size-6 rounded-full p-1 aspect-square bg-secondary ml-auto hover:bg-secondary"
                onClick={() => deleteTodo(todo.id)}
              >
                <Cross2Icon className="text-red-500 cursor-pointer" />
              </Button>
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
