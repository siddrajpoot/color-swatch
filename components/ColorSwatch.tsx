import { UniqueColor } from "@/lib/types"

interface ColorSwatchProps {
  color: UniqueColor
}

const ColorSwatch = ({ color }: ColorSwatchProps) => {
  if (color.hex && color.name) {
    return (
      <div key={color.hex} className="flex w-full flex-col items-center">
        <div
          style={{ backgroundColor: color.hex }}
          className={`aspect-square w-full rounded-lg drop-shadow-lg`}
        ></div>
        <p className="gray-200 mt-4">{color.name}</p>
      </div>
    )
  }
}
export default ColorSwatch
