import { AppointmentInterface } from "./appointments"
import { PatientInterface } from "./patients"
import { ProcedureInterface } from "./procedure"
import { UserInterface } from "./user"


export interface SpecimenTypeInterface{
    specimen_type_id: number,
    specimen_type_description: string,

}

export interface ResultStatusInterface{
    results_status_id: number,
    results_status_description: string,

}

export interface InternalLabRequestInterface{
    appointment?: AppointmentInterface
    lab_request_id: number,
    appointment_id: number,
    patient_id: number,
    patient_detail?: PatientInterface
    doctor_id: number,
    user?: UserInterface
    procedure_id: number,
    procedure_detail?: ProcedureInterface
    status: number,
    cost: number,
    hospital_id: number,
    pay_status: number,
    results: string,
    user_id: number,
    service_type_id: number,
    quantity: number,
    request_reference: string,
    microscopy: string,
    flag: string,
    specimen_type_id: number,
    date_of_request: string,
    time_of_request: string,
    results_posting_locked: string,
    request_number: string,
    notes: string,
    results_status_id: string,
    is_referral: string,
    referral_supplier_id: number,
    procedure_performed: string,
    operation_category_id: number,
    operation_sub_category_id: number,
    specimen_referral_type_id: number,
    hiv_service_id: number,
    procedure_performed_by: number,
    is_exclusion: string,

}