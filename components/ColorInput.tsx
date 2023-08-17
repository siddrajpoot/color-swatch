import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type ColorInputProps = {
  label: string
  defaultValue: number
}

export function ColorInput({ label, defaultValue }: ColorInputProps) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        min={0}
        max={100}
        type="number"
        id={label}
      />
    </div>
  )
}
