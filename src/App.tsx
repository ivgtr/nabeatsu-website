import { nabeatsu } from 'nabeatsu'
import React, { useMemo, useRef, useState } from 'react'

export const App = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState<string>('')
  const [checked, setChecked] = useState<boolean>(false)
  const handleCheckboxClick = useMemo(() => {
    return () => {
      setChecked((e) => {
        return !e
      })
    }
  }, [])

  const speak = (text: string) => {
    return new Promise((resolve, _reject) => {
      speechSynthesis.cancel()
      const options = new SpeechSynthesisUtterance(text)
      options.lang = 'ja-JP'
      options.onend = options.onerror = () => resolve(speechSynthesis.cancel())
      speechSynthesis.speak(options)
    })
  }

  // const sleep = (wait: number) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(true)
  //     }, wait * 1000)
  //   })
  // }

  const submit = () => {
    if (inputRef.current?.value) {
      if (checked) {
        ;(async () => {
          for (let i = 0; i <= Number(inputRef.current?.value); i++) {
            const text = nabeatsu(i)
            setText(text || '0')
            await speak(text || '0')
          }
        })()
      } else {
        const text = nabeatsu(String(inputRef.current?.value))
        setText(text)
        speak(text)
      }
    }
  }

  return (
    <div className="App max-w-screen-md mx-auto">
      <div className="px-4 mt-6">
        <h1 className="text-4xl font-bold py-4">世界のナベアツ</h1>
        <p className="">3の倍数と3の付く数字でアホになります。</p>
        <small className="">*音声を読み上げます</small>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
        >
          <div className="flex items-center mt-6">
            <div className="max-w-xs w-full">
              <input
                type="number"
                ref={inputRef}
                className="h-8 px-2 block w-full rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button className="h-8 ml-2 w-16 rounded-md border border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
              Click
            </button>
          </div>
          <div>
            <label htmlFor="loop">数え上げモード</label>
            <input
              type="checkbox"
              name="check_loop"
              id="loop"
              checked={checked}
              onChange={handleCheckboxClick}
            />
          </div>
        </form>

        <div className="mt-8">
          {text.length > 0 && <p className="text-3xl font-bold">{text}</p>}
        </div>
      </div>
    </div>
  )
}
