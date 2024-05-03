export interface Person {
    id: string
    first_name: string
    last_name: string
    class: number
    active: boolean
}

export interface Record {
    id: string
    person_id: string
    date: string
    presence: string
    dress: boolean
    bible: boolean
    bonus: number
}

export interface PersonRecord {
    id?: string
    person_id: string
    first_name: string
    last_name: string
    class: number
    date: string
    presence: string
    dress: boolean
    bible: boolean
    bonus: number
}
