import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { twJoin } from "tailwind-merge";
import { useToast } from "@/hooks/use-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z.string().email("Ingrese un correo válido"),
  message: z.string().min(1, "El mensaje es obligatorio"),
});

export default function ContactForm() {
  const { toast } = useToast();

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const result = await fetch("https://formspree.io/f/mjkbqbla", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    reset();

    if (!result.ok) {
      toast({
        title: "¡Ups! Algo salió mal.",
        description: "Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Gracias por tu mensaje!",
      description: "Te responderemos lo antes posible.",
    });
  };

  return (
    <Card className="flex w-full flex-col items-center px-4 py-8 lg:px-8">
      <h2 className="mb-8 text-2xl font-bold lg:text-3xl">
        Describe tu proyecto
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
        className="flex w-full flex-col space-y-4"
      >
        <div className="flex w-full flex-col space-y-2">
          <Label
            htmlFor="name"
            className={twJoin(formState.errors.name ? "text-red-500" : "")}
          >
            Nombre
          </Label>
          <Input
            placeholder="Jhon Doe"
            type="text"
            id="name"
            {...register("name")}
          />
          <p className="mt-2 text-sm text-red-500">
            {formState.errors.name?.message}
          </p>
        </div>

        <div className="flex w-full flex-col space-y-2">
          <Label
            htmlFor="email"
            className={twJoin(formState.errors.email ? "text-red-500" : "")}
          >
            Correo
          </Label>
          <Input
            placeholder="email@example.com"
            type="emaul"
            id="email"
            {...register("email")}
          />
          <p className="mt-2 text-sm text-red-500">
            {formState.errors.email?.message}
          </p>
        </div>

        <div className="flex w-full flex-col  space-y-2">
          <Label
            htmlFor="message"
            className={twJoin(formState.errors.message ? "text-red-500" : "")}
          >
            Mensaje
          </Label>
          <Textarea
            rows={6}
            id="message"
            className="resize-none"
            placeholder="Escribe aquí tu mensaje"
            {...register("message")}
          />
          <p className="mt-2 text-sm text-red-500">
            {formState.errors.message?.message}
          </p>
        </div>
        <Button type="submit">Enviar</Button>
      </form>
    </Card>
  );
}
