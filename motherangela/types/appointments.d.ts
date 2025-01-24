import { ConsultationTypesGroupInterface } from "./consultation";
import { PatientInterface, UserInterface } from "./patients";


export interface ReferralTypesInterface{
  referral_type_id: number;
  referral_type_description: string;

}

export interface AppointmentInterface {
  account_type_id: number;
  admission_status: string | null;
  appointment_time: string;
  appointment_id: string;
  appointment_date: string | Date;
  appointment_status: string
  charges: number;
  claim_number: string | null;
  clinic_id: null | string;
  company_id: string | null;
  consultation_group_id: string | null;
  consultation_type: string | null;
  consultation_type_sub_group_id: string | null;
  consultation_types_group?: ConsultationTypesGroupInterface
  doctor_id: string | null;
  hospital_id: string | null;
  insurance_detail: {
    insurance_name: string | null;
  };
  insurance_limit_type_id: string | null;
  invoice_no: string | null;
  maximum_billable_amount: string | null;
  muac_for_infants: string | null;
  nhif_applicability: string | null;
  nhif_claim_number: string | null;
  nhif_rebate_amount: string | null;
  nhif_rebate_amount_of_applicable_days: string | null;
  patient_detail: PatientInterface;
  patient_id: string;
  patient_monitoring_notes: string | null;
  patient_registration_charge: string | null;
  payment_status: string | null;
  reference_account_id: number;
  referral_type_id: string | null;
  referral_type?: ReferralTypesInterface;
  total_appointment_discount: string | null;
  user: UserInterface | null;
}

export interface AppointmentDiagnosisInterface{
  appointment?: AppointmentInterface & {
    patient_detail?: PatientInterface
  }
  appointment_diagnosis: string
  appointment_id: string
  diagnosis_id: string
  diagnosis_for: string
}