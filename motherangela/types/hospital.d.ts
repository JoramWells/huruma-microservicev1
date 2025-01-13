export interface HospitalClinics{
    clinic_id: number
    clinic_name: number
    invoice_prefix: number
}

export interface HospitalStoreTypeInterface{
    hospital_store_type_id: number
    hospital_store_type_description: string

}

export interface HospitalStoreInterface{
    hospital_store_id: number
    hospital_store_description: string
    clinic_id: string
    hospital_store_type_id: string
}