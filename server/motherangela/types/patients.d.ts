import { UserInterface } from "./user"

export interface PatientInterface{
    allergies: string
    cct: string
    cell_phone: string
    company_id: string
    copay_payment_account_id: string
    day_of_birth: string
    dob: string
    email: string
    existing_patient: string
    first_name: string
    highest_iops: string
    hospital_id: string
    id_number: string
    in_patient_file_no: string
    insurance_membership_number: string
    last_name: string
    membership_enabled: string
    middle_name: string
    month_of_birth: string
    next_of_kin: string
    next_of_kin_name: string
    nhif_no: string
    nxt_of_kin_cell_phone: string
    old_patient_file_no_inpatient: string
    out_patient_file_no: string
    patient_category_id: string
    patient_gender: string
    patient_id: number
    patient_type: string
    principal_member_name: string
    residence: string
    residence_id: string
    staff_number: string

}

export interface AdmissionTypeInterface{
  admission_type_id: number;
  admission_type_description: string;

}

export interface AdmissionBedBillingTypesInterface{
  bed_billing_type_id: number;
  bed_billing_type_description: string;

}

export interface AdmissionCategoryInterface{
  admission_category_id: number;
  admission_category_description: number;
}

export interface AdmissionInterface {
  admission_bed_billing_type?: AdmissionBedBillingTypesInterface
  admission_category?: AdmissionCategoryInterface;
  admission_category_id: string;
  admission_charge: string | number;
  admission_date: string | Date;
  admission_id: string;
  admission_time: string;
  admission_type?: AdmissionTypeInterface
  admission_type_id: string | number;
  appointment_id: string;
  bed_billing_type_id: string;
  bed_id: string;
  bill_daily_doctor_ward_round_charges: string;
  clinical_summary?: string;
  daily_bed_rate: string;
  daily_bed_rate_number_of_days: string;
  daily_doctor_ward_round_rate: string
  daily_nursing_rate: string
  deposit_amount: string
  diagnosis: string
  discharge_date: string
  discharge_time: string
  discharge_type_id: string
  doctor_admitting: string
  doctor_id: string
  doctor_ward_rounds_no_of_days: string
  hospital_id: string
  hospital_inpatient_id: string
  inpatient_case_type_id: string
  maternity_package_amount: string
  maternity_package_service_type_id: string
  package_type: string
  patient_detail: PatientInterface
  patient_id: string
  pay_status: number
  review_date: string
  user?: UserInterface
  ward:{
    ward_description: string
  }
  ward_bed:{
    bed_number: string
  }
  ward_id: string
}

export interface PeopleRelationsInterface{
  id: string
  description: string
}

export interface ResidenceDetailsInterface{
  residence_id: number
  residence_name: string
}

