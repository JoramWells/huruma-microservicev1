import { MedicineInterface } from "./pharmacy";

export interface InsuranceTypeInterface{
  insurance_type_description: string
}

export interface InsuranceInterface {
  box_address: string;
  discount_percentage: string;
  email: string | null;
  full_discount_on_all_services: string;
  insurance_id: number;
  insurance_limit_type_id: string;
  insurance_name: string;
  insurance_type: InsuranceTypeInterface
  insurance_type_id: string;
  maximum_billable_amount: string;
  nhif_rebate: string;
  payment_percentage_in_patient: string;
  payment_percentage_out_patient: string;
  phone_no: string
  requires_claim_number: string
  revenue_expected: string
  status: string
  withholding_tax_application: string
}

export interface ServiceTypeInterface{
  service_type_id: number
  service_type_description: string
  credit_account_id: number
  confirmation: string
  time_allowed_before_locking_save_functionality: number
  is_miscellaneous: string

}

export interface InsuranceServiceCostMappingInterface{
  copay_amount: string
  cost: string
  hospital_id: string
  insurance_detail?:InsuranceInterface
  insurance_id: string
  percentage_discount: string
  service_cost_mapping_id: number
  service_id: string
  service_type: ServiceTypeInterface
  service_type_id: string
  withholding_tax_percentage: string
}

export interface InsuranceMedicineMappingInterface{
  insurance_detail: InsuranceInterface
  insurance_id: string
  mapping_id: number
  medication: MedicineInterface
  medication_id: string
  visible: string

}

export interface CompanyDetailsInterface{
  company_id: number
  company_name: string
  insurance_limit_type_id: number
  maximum_billable_amount: number
  payment_percentage_out_patient: number
  payment_percentage_in_patient: number
  revenue_expected: number

}