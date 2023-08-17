import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { HUE_SPACING, PAGE_SIZE } from "./constants"
import { ColorDictType, HSLType, UniqueColor } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchColorPromise = (hsl: HSLType) => {
  const apiUrl = `https://www.thecolorapi.com/id?hsl=${formattedHSL(hsl)}`

  return fetch(apiUrl).then((res) => res.json())
}

export const getColors = async (
  s: number,
  l: number,
  prevColorsDict: ColorDictType,
  page: number
): Promise<{ validColors: UniqueColor[]; newColorDict: ColorDictType }> => {
  const newColorDict: ColorDictType = { ...prevColorsDict }
  const validColors: UniqueColor[] = []

  return new Promise((resolve) => {
    Promise.all(
      Array(PAGE_SIZE)
        .fill(null)
        .map((_, i) => {
          const hueValue =
            i * HUE_SPACING + (page - 1) * PAGE_SIZE * HUE_SPACING
          return fetchColorPromise({
            h: hueValue,
            s,
            l,
          })
        })
    ).then((colorData) => {
      colorData.forEach(({ name }) => {
        const value: string = name.value
        if (!newColorDict[value]) {
          validColors.push({
            name: name.value,
            hex: name.closest_named_hex,
          })
          newColorDict[value] = true
        }
      })

      resolve({ validColors, newColorDict })
    })
  })
}

export const formattedHSL = (hsl: HSLType) => {
  return `${hsl.h},${hsl.s}%,${hsl.l}%`
}
