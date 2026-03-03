import { useCvStore } from "../../store/useCvStore"
import Record from "./Record"

export default function HeaderSection() {
    const { cvData, setHeader } = useCvStore()
    const { header: value } = cvData
    const onChange = setHeader
    const { name, surname, professionalTitle, contactDetails } = value

    const addNewContactRecord = () => {
        const key = prompt("Enter contact type (e.g., email, phone, linkedin):")
        if (key) {
            onChange({
                ...value,
                contactDetails: {
                    ...contactDetails,
                    [key]: ''
                }
            })
        }
    }

    const onSetContactDetail = (label: string, newValue: string) => {
        onChange({
            ...value,
            contactDetails: {
                ...contactDetails,
                [label]: newValue
            }
        })
    }

    const onRemoveContactDetail = (label: string) => {
        const {[label]: _, ...rest} = contactDetails
        onChange({
            ...value,
            contactDetails: rest
        })
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 transition-all hover:shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Personal Information
            </h2>
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-4">
                    <Record 
                        section="header" 
                        label="Name"
                        type="text"
                        value={name}
                        onChange={(val) => onChange({...value, name: val})}
                        placeholder="e.g. John"
                    />
                    <Record 
                        section="header" 
                        label="Surname"
                        type="text"
                        value={surname}
                        onChange={(val) => onChange({...value, surname: val})}
                        placeholder="e.g. Doe"
                    />
                </div>
                <Record 
                    section="header" 
                    label="Professional Title"
                    type="text"
                    value={professionalTitle}
                    onChange={(val) => onChange({...value, professionalTitle: val})}
                    placeholder="e.g. Senior Software Engineer"
                />
                <Record 
                    section="header" 
                    label="About Me"
                    type="text"
                    value={value.aboutMe || ''}
                    onChange={(val) => onChange({...value, aboutMe: val})}
                    placeholder="Tell us about yourself"
                />
                
                <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Details</h3>
                    <div className="flex flex-col gap-3">
                        {Object.entries(contactDetails).map(([key, val]) => (
                            <div className="flex items-end gap-2 group" key={key}>
                                <div className="flex-1">
                                    <Record 
                                        section="header-contactDetails" 
                                        label={key}
                                        type="text"
                                        value={val}
                                        onChange={(newValue) => onSetContactDetail(key, newValue)}
                                        placeholder={`Enter your ${key}`}
                                    />
                                </div>
                                <button 
                                    onClick={()=>onRemoveContactDetail(key)} 
                                    className="mb-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    title="Remove contact"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={addNewContactRecord}
                        className="mt-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <span>+</span> Add Contact Detail
                    </button>
                </div>
            </div>
        </div>
    )
}