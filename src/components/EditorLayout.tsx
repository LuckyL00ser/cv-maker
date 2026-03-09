import { useState } from 'react'

interface EditorLayoutProps {
  form: React.ReactNode
  renderer: React.ReactNode
}

type Tab = 'form' | 'preview'

export default function EditorLayout({ form, renderer }: EditorLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('form')

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full bg-gray-100 overflow-hidden">
      {/* Mobile tab bar */}
      <div className="lg:hidden flex border-b border-gray-200 bg-white">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'form'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <div
          className={`
            lg:basis-lg lg:block lg:h-full lg:overflow-y-auto lg:border-r lg:border-gray-200 lg:bg-white lg:shadow-sm lg:z-10
            ${activeTab === 'form' ? 'flex flex-col overflow-y-auto bg-white' : 'hidden'}
          `}
        >
          {form}
        </div>

        {/* Renderer panel */}
        <div
          className={`
            lg:flex lg:flex-1 lg:h-full lg:overflow-y-auto lg:p-8 lg:justify-center lg:bg-gray-100 object cover
            ${activeTab === 'preview' ? 'flex flex-1 overflow-y-auto p-4 justify-center bg-gray-100' : 'hidden'}
          `}
        >
          {renderer}
        </div>
      </div>
    </div>
  )
}