"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface InputFormProps {
  defaultSaturationValue: number
  defaultLightnessValue: number
  onFormSubmit: (saturationValue: number, lightnessValue: number) => void
}

const FormSchema = z.object({
  saturation: z.coerce
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .min(0, { message: "Must be greater than 0" })
    .max(100, { message: "Must be less than 100" }),
  lightness: z.coerce
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .min(0, { message: "Must be greater than 0" })
    .max(100, { message: "Must be less than 100" }),
})

export function InputForm({
  defaultSaturationValue,
  defaultLightnessValue,
  onFormSubmit,
}: InputFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      saturation: defaultSaturationValue,
      lightness: defaultLightnessValue,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    onFormSubmit(data.saturation, data.lightness)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-x-4 gap-y-4 lg:flex-row lg:items-end"
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="saturation"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-end justify-between">
                  <FormLabel>Saturation</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="ex: 50"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="lightness"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-baseline justify-between">
                  <FormLabel>Lightness</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    {...field}
                    required
                    type="number"
                    placeholder="ex: 100"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
