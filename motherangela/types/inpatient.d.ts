import { AppointmentInterface } from "./appointments"
import { AdmissionInterface, PatientInterface, UserInterface } from "./patients"

export interface InpatientTreatmentChartInterface{
    inpatient_treatment_chart: number
    appointment?: AppointmentInterface & {
        patient_detail?: PatientInterface
    }
    appointment_id: number
    admission_id: number
    patient_id: number
    drug: string
    dose: string
    route: string
    frq: string
    extra_details: string
    hospital_id: string
    user_id: string
    user?: UserInterface
    date_of_treatment: string
    duration: string
    nurse_id: string
    patient_detail?: PatientInterface
    time_of_treatment: string
}

export interface InpatientPhysiotherapistVisitsInterface{
    inpatient_physiotherapist_visit_id: number
    appointment_id: number
    appointment?: AppointmentInterface & {
        patient_detail?: PatientInterface
    }
    admission_id: number
    admission?: AdmissionInterface & {
        patient_detail?: PatientInterface
    }
    patient_id: number
    patient_detail?: PatientInterface;
    physiotherapist_id: number
    date_of_visit: string | Date
    time_of_visit: string
    cost_of_visit: number
    physiotherapist_notes: string
    hospital_id: string
    user_id: string
    user?: UserInterface
    payment_status: string

}

export interface InpatientNurseVisitsInterface{
    inpatient_nurse_visit_id: number
    appointment_id: number
    appointment?: AppointmentInterface & {
        patient_detail?: PatientInterface
    }
    admission_id: number
    admission?: AdmissionInterface & {
        patient_detail?: PatientInterface
    }
    patient_id: number
    patient_detail?: PatientInterface;
    nurse_id: number
    date_of_visit: string | Date
    time_of_visit: string
    cost_of_visit: number
    nurse_notes: string
}

export interface InpatientDoctorVisitsDoctor{
    inpatient_doctor_visit_id: number
    appointment_id: number
    appointment?: AppointmentInterface & {
    patient_detail?: PatientInterface
    }
    admission_id: number
    admission?: AdmissionInterface & {
        patient_detail?: PatientInterface
    }
    patient_id: number
    patient_detail?: PatientInterface;
    doctor_id: number
    date_of_visit: string | Date
    time_of_visit: string
    cost_of_visit: number
    doctor_notes: string
}