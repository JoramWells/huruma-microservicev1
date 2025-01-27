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

export interface HospitalInterface{
    hospital_id: number
    hospital_name: string
    hospital_address: string
    hospital_location: string
    hospital_employer_number: string
    expire_passwords_at_start_of_every_month: string
    personal_accounts_usage: string
    receipt_printer_type: string
    users_mnemonic_lab: string
    night_shift_start: string
    night_shift_end: string
    show_diagnosis_setting: string
    drugs_selling_price_derivation_setting: string
    multiplication_factor_corporate: string
    difference_invoice_for_each_service_type: string
    pre_printed_logo_height: string
    smart_service_provider_number: string
    smart_service_ip_address: string
    smart_service_port_number: string
    smart_service_db_name: string
    smart_service_user_name: string
    smart_service_db_password: string

}