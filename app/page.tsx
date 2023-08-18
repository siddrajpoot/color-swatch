/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useRef, useState } from "react"

import ColorSwatch from "@/components/ColorSwatch"
import { useIntersectionObserver } from "@/lib/useIntersectionObserver"
import { HUES_VALUE, HUE_SPACING, PAGE_SIZE } from "@/lib/constants"
import { getColors } from "@/lib/utils"
import { UniqueColor } from "@/lib/types"
import { InputForm } from "@/components/InputForm"
import { Metadata } from "next"

export default function Home() {
  const [shouldFetch, setShouldFetch] = useState(true)
  const [isFetching, setIsFetching] = useState(true)
  const [saturationInput, setSaturationInput] = useState(100)
  const [lightnessInput, setLightnessInput] = useState(50)
  const [colorsDict, setColorsDict] = useState({})
  const [colors, setColors] = useState<UniqueColor[]>([])
  const [page, setPage] = useState(1)

  const intersectionRef = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(intersectionRef, {})

  // effect hook to see if it should fetch for more colors
  useEffect(() => {
    const isSentryVisible = entry?.isIntersecting
    const isNotLastPage = (page - 1) * PAGE_SIZE < HUES_VALUE / HUE_SPACING

    if (isSentryVisible && !shouldFetch && !isFetching && isNotLastPage) {
      setShouldFetch(true)
    }
  }, [entry?.isIntersecting, shouldFetch, isFetching])

  // fetch colors and add it into the colors state while also adding all new colors into the colors dictionary
  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false)
      setIsFetching(true)
      getColors(saturationInput, lightnessInput, colorsDict, page).then(
        ({ validColors, newColorDict }) => {
          setIsFetching(false)
          setColors((prev) => [...prev, ...validColors])
          setColorsDict((prev) => ({ ...prev, ...newColorDict }))
          setPage((prev) => prev + 1)
        }
      )
    }
  }, [shouldFetch])

  const renderIsFetching = () => (
    <div className="flex w-full animate-pulse flex-col items-center">
      <div className="aspect-square w-full rounded-lg bg-gray-300" />
      <p className="mt-4 h-2 w-24 rounded-lg bg-gray-200"></p>
    </div>
  )

  const handleFormSubmit = (
    saturationValue: number,
    lightnessValue: number
  ) => {
    if (
      saturationValue !== saturationInput ||
      lightnessValue !== lightnessInput
    ) {
      setSaturationInput(saturationValue)
      setLightnessInput(lightnessValue)
      setColors([])
      setColorsDict({})
      setShouldFetch(true)
      setPage(1)
    }
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 items-center justify-between gap-x-4 gap-y-4 lg:grid-cols-2">
        <h1 className="text-center text-xl font-bold lg:text-left lg:text-4xl">
          Color Swatches
        </h1>

        <div className="ml-auto w-full">
          <InputForm
            onFormSubmit={handleFormSubmit}
            defaultSaturationValue={saturationInput}
            defaultLightnessValue={lightnessInput}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-5 xl:mt-12 xl:grid-cols-6 xl:gap-12">
        {colors.map((color) => (
          <ColorSwatch key={color.hex} color={color} />
        ))}
        {isFetching && renderIsFetching()}
      </div>
      <div className="h-0 w-0" ref={intersectionRef}></div>
    </main>
  )
}
