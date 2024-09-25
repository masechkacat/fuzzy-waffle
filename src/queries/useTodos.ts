import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

import { getTodos, createTodo, updateTodo, deleteTodo } from "./todos";
import { Todo } from "@/queries/Todo";

export function useTodos() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const useGetTodos = () => {
    return useQuery<Todo[]>({
      queryKey: ["todos"],
      queryFn: getTodos,
    });
  };

  const useCreateTodo = () => {
    return useMutation<unknown, unknown, Omit<Todo, "id">>({
      mutationFn: (todo: Omit<Todo, "id">) => createTodo(todo),
      onSuccess: () => {
        toast({
          title: "Todo created",
          description: "Your todo has been created",
        });
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: error => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Todo creation failed",
            description: error.message,
          });
        }
      },
    });
  };

  const useUpdateTodo = () => {
    return useMutation<unknown, unknown, Todo>({
      mutationFn: (todo: Todo) => updateTodo(todo),
      onSuccess: () => {
        toast({
          title: "Todo updated",
          description: "Your todo has been updated",
        });
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: error => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Todo update failed",
            description: error.message,
          });
        }
      },
    });
  };

  const useDeleteTodo = () => {
    return useMutation<unknown, unknown, number>({
      mutationFn: (id: number) => deleteTodo(id),
      onSuccess: () => {
        toast({
          title: "Todo deleted",
          description: "Your todo has been deleted",
        });
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
      onError: error => {
        if (error instanceof Error) {
          toast({
            variant: "destructive",
            title: "Todo deletion failed",
            description: error.message,
          });
        }
      },
    });
  };

  return {
    useGetTodos,
    useCreateTodo,
    useUpdateTodo,
    useDeleteTodo,
  };
}
