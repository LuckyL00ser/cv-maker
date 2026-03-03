interface RecordProps {
    section: string;
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function Record({ section, label, type, value, onChange, placeholder }: RecordProps) {
    const id = `${section}-${label}`
    return <div className="flex flex-col gap-1 mb-3 w-full">
        <label htmlFor={id} className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{label}</label>
        <input 
            id={id} 
            type={type} 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-white text-gray-800 text-sm shadow-sm" 
            placeholder={placeholder}
        />
    </div>
}