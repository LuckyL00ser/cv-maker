import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import './App.css'
import EditorLayout from './components/EditorLayout'
import Form from './components/Form'
import Renderer from './components/Renderer'
import { useCvStore } from './store/useCvStore'

function App() {
  const componentRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'My CV',
  })
  const downloadJSON = () => {
    if (!componentRef.current) return
    const cvData = useCvStore.getState().cvData
    const blob = new Blob([JSON.stringify(cvData,null,"\t")], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const name = cvData.header.name
    const surname = cvData.header.surname
    const date = new Date().toISOString().split('T')[0]
    link.download = `cv-data-${name}-${surname}-${date}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      <header className="h-16 px-6 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm z-20">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">CV</div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">CV Maker</h1>
        </div>
        <div className="flex items-center gap-4">
            <button
                title="Structured data in case you want a differrent styling or a copy" 
                onClick={() => downloadJSON()}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-sm"
            >
                Download JSON
            </button>
            <button 
                onClick={() => handlePrint()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF
            </button>
        </div>
      </header>
      <EditorLayout 
        form={<Form />} 
        renderer={
           <div ref={componentRef}>
             <Renderer />
            </div>
        }
      ></EditorLayout>
    </div>
  )
}

export default App
