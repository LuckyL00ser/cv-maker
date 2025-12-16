type Contact = Record<string,string>
interface IHeader {
    name: string
    surname: string
    professionalTitle: string
    aboutMe: string | null
    contactDetails: Contact //email, phone, socials etc.
}
interface IExperienceItem {
    position: string
    company: string
    location: string | null
    startDate: Date
    endDate: Date | null
    plainDescription: string | null
    bulletedDescription: string[] | null
}
interface IEducationItem {
    degree: string
    institution: string
    locaton: string | null
    startDate: Date
    endDate: Date | null
    description: string
}
interface ISkills {
    skillGroup: Record<string, string[]>
}
interface IHobbies {
    hobbies: string[]
}
interface ICvData {
    header: IHeader
    experience: IExperienceItem[]
    education: IEducationItem[]
    skills: ISkills
    hobbies: IHobbies | null
}