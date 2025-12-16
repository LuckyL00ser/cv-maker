
interface EditorLayoutProps {
  form: React.ReactNode
  renderer: React.ReactNode
}

export default function EditorLayout({ form, renderer }: EditorLayoutProps) {
  return (
    <div className="h-[calc(100vh-64px)] w-full flex bg-gray-100 overflow-hidden">
        <div className="w-[450px] h-full overflow-y-auto border-r border-gray-200 bg-white shadow-sm z-10">
            {form}
        </div>
        <div className="flex-1 h-full overflow-y-auto p-8 flex justify-center bg-gray-100">
            <div className="scale-[0.8] origin-top transform-gpu">
                {renderer}
            </div>
        </div>
    </div>
    )
}