import { ContactDetails } from "../ContactDetails";

interface HeaderSectionProps {
    header: IHeader;
}

export default function HeaderSection({ header }: HeaderSectionProps) {
    return (
        <>
            <header className="border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider">{header.name} {header.surname}</h1>
                <h2 className="text-xl text-gray-600 mt-1">{header.professionalTitle}</h2>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <ContactDetails details={header.contactDetails} />
                </div>
            </header>
            {
                header.aboutMe && 
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1">About Me</h2>
                    <p>{header.aboutMe}</p>
                </section>
            }
        </>
    )
}
