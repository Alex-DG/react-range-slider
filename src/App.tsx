import * as React from 'react'
import './config/styles/app.css'

import Slider from './components/Slider'
import Card from './components/Card'

import { Range, Result } from './config/types'

// An array of range we want to use through some slider components
const ranges: Range[] = [
  {
    label: 'Percentage Label',
    max: 100,
    min: 0,
    step: 1,
    value: 67,
    unit: '%',
  },
  // {
  //   label: 'Proportional Label',
  //   max: 1,
  //   min: 0,
  //   step: 0.01,
  //   value: 0.33,
  // },
]

// An array of results updated by the sliders components on move
const defaultResults: Result[] = ranges.map(({ label, value, unit = '' }) => {
  return { label, value, unit }
})

export default function App() {
  const [results, setResults] = React.useState<Result[]>(defaultResults)

  /**
   * On slider change update results
   *
   * @param value - number - new value
   * @param updateAt - number - index which needs to be updated
   */
  const handleChange = (value: number, updateAt: number) => {
    const newResults = results.map((result, index) => {
      if (index === updateAt) return { ...result, value }
      return result
    })

    setResults(newResults)
  }

  return (
    <div className="App">
      <div className="challenge">
        <Card>
          {ranges.map((data, index) => (
            <Slider
              key={index}
              {...data}
              onChange={(value) => handleChange(value, index)}
            />
          ))}
        </Card>

        <Card title="Results">
          {results.map(({ label, value, unit }, index) => (
            <p key={index}>
              <span>{label}:</span>{' '}
              <strong>
                {value}
                {unit}
              </strong>
            </p>
          ))}
        </Card>
      </div>
    </div>
  )
}
