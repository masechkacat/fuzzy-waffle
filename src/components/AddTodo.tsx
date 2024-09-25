import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

// queries
import { useTodos } from "@/queries/useTodos";

// types
import { Todo } from "@/queries/Todo";

// utils
import { urgencyMap } from "@/utils/urgencyMap";

// components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon, MinusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title is too long" }),
  urgency: z.enum(["low", "medium", "high"]),
});

export function AddTodo() {
  const [isDeployed, setIsDeployed] = useState(false);
  const { useCreateTodo } = useTodos();
  const { mutate: createTodo } = useCreateTodo();

  const handleCreateTodo = (todo: Omit<Todo, "id">) => {
    createTodo(todo);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      urgency: "low",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleCreateTodo({
      title: values.title,
      urgency: values.urgency,
      completed: false,
    });
  };

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Add Todo</CardTitle>
          <Button
            onClick={() => setIsDeployed(!isDeployed)}
            className="bg-secondary rounded-full p-1 aspect-square hover:bg-secondary"
          >
            {!isDeployed ? (
              <PlusIcon className="text-purple-500 cursor-pointer" />
            ) : (
              <MinusIcon className="text-purple-500 cursor-pointer" />
            )}
          </Button>
        </div>
      </CardHeader>
      <AnimatePresence>
        {isDeployed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                    // reset form
                    form.setValue("title", "");
                    form.setValue("urgency", "low");
                  }}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="type a title" {...field} />
                        </FormControl>
                        <FormDescription>
                          Your todo title should be short and descriptive
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(urgencyMap).map(([urgency]) => (
                              <SelectItem key={urgency} value={urgency}>
                                {urgency[0].toUpperCase() + urgency.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Pick between a low, medium and high urgency
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
