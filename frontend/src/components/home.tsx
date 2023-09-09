import { useForm } from "react-hook-form";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { FormControl, FormField, FormItem, Form, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { codes } from "@/codes";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const calculateFormSchema = z.object({
  ancho: z.string({
    required_error: "Por favor ingrese un numero.",
  }),
  largo: z.string({
    required_error: "Por favor ingrese un numero.",
  }),
  codigo: z.string({
    required_error: "Por favor selecciona un codigo.",
  }),
});

type CalculateFormValues = z.infer<typeof calculateFormSchema>;

export default function Home() {
  const [factor, setFactor] = useState(0.0)
  const [result, setResult] = useState(0.0)
  const form = useForm<CalculateFormValues>({
    resolver: zodResolver(calculateFormSchema),
  });
  const handleSubmit = async (data: CalculateFormValues) => {
    // Convertir los valores de ancho y largo a números
    const ancho = parseFloat(data.ancho);
    const largo = parseFloat(data.largo);

    if (ancho < 0 || largo < 0) {
      console.error(
        "Los valores de ancho y largo deben ser números positivos."
      );
      return;
    }
    // Verificar si la conversión fue exitosa
    if (isNaN(ancho) || isNaN(largo)) {
      console.error("Los valores de ancho y largo deben ser números válidos.");
      return;
    }

    setResult(largo * ancho * factor)

    // Resto de tu código aquí
    form.reset({
      ancho: "",
      largo: "",
    });

  };
  console.log(result)
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <Form {...form}>
          <div className="flex items-center justify-evenly">
            <FormField
              control={form.control}
              name="ancho"
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormControl>
                    <Input type="number" placeholder="Ancho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <X />
            <FormField
              control={form.control}
              name="largo"
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormControl>
                    <Input type="number" placeholder="Largo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="codigo"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center p-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? codes.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Selecciona un codigo"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Busca un codigo..." />
                      <CommandEmpty>Codigo no encontrado.</CommandEmpty>
                      <CommandGroup>
                        {codes.map((code) => (
                          <CommandItem
                            value={code.label}
                            key={code.value}
                            onSelect={() => {
                              form.setValue("codigo", code.value);
                              setFactor(code.description)
                            }}

                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                code.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <HoverCard>
                              <HoverCardTrigger>{code.label}</HoverCardTrigger>
                              <HoverCardContent>
                                {code.description}
                              </HoverCardContent>
                            </HoverCard>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <div className="flex justify-center items-center py-6">
          <Button type="submit">Calcular</Button>
        </div>
      </form>
      <p className="flex items-center justify-center mt-20 font-bold text-6xl">
        ${Number(result).toFixed(2)}
      </p>
    </div>
  );
}
