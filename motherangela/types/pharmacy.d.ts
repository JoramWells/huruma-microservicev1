import { AppointmentInterface } from "./appointments";
import { PatientInterface } from "./patients";
import { UserInterface } from "./user";

export interface MedicineInterface{
  medication_id: string
  medication_name: string
  medication_category?: MedicineCategory;
  medication_category_id: string
  hospital_id: string
  price: string
  quantity: string
  price_corporate: string
  reorder_level: string
  medication_packaging_type_id: string
  price_foreigner: string
  buying_price: string
  sell_at_buying_price: string
  visible: string
  linked_item_id: string
  appointment_type_allowed: string
  medication_group_id: string

}

export interface MedicineCategory{
    category_name: string
}

export interface MedicinePackageTypeInterface{
    package_description: string
}

export interface MedicineStockInterface {
  appointment_type_allowed: string;
  buying_price: string;
  hospital_id: string;
  linked_item_id: string;
  medication_category?: MedicineCategory;
  medication_category_id: string;
  medication_group_id: string;
  medication_id: string;
  medication_name: string;
  medication_package_type: MedicinePackageTypeInterface;
  medication_package_type_id: string | null;
  price: string | null
  price_corporate: string | null
  price_foreigner: string | null
  quantity: number | null
  reorder_level: number | null
  sell_at_buying_price: string | null
  visible: string | null
}

export interface MedicineCategoryInterface{
  category_id: number
  category_name: string
  credit_account_id: string
  hospital_id: string
}

export interface HospitalStoreInterface {
  hospital_store_id: string;
  hospital_store_description: string;
  hospital_store_type_id: string;
  clinic_id: string;
}

export interface SupplierInterface {
  supplier_id: string;
  supplier_name: string;
  supplier_phone: string;
  supplier_address: string;
}

interface MedicinePurchaseTypeInterface {
  medication_purchase_type_id: string;
  medication_purchase_type_description: string;
  hospital_id: string
}
export interface MedicinePurchaseInterface {
  batch_no: string;
  bonus: number;
  date_of_receipt: Date | string | null;
  expiry_date: Date | string | null;
  hospital_id: string;
  hospital_store: HospitalStoreInterface;
  hospital_store_id: string;
  medication: MedicineInterface;
  medication_id: string;
  medication_purchase_type: MedicinePurchaseTypeInterface;
  medication_purchase_type_id: string;
  percentage_discount: string;
  price: string;
  purchase_id: number;
  purchase_order_number: string | null;
  quantity: number;
  real_bonus: number;
  real_quantity: number;
  receipt_no: string;
  serial: string | null;
  supplier?: SupplierInterface
  supplier_id: string | null;
  tax_percentage: string | null;
  user: UserInterface;
  user_id: string;
}

export interface MedicationStockTakeInterface {
  correct_quantity: string;
  current_quantity: string;
  current_quantity_total_price: string;
  date_of_stock_take: Date | string | null
  expiry_date: Date | string
  hospital_id: string
  hospital_store_id: string
  medication_category_id: string
  medication_category?: MedicineCategory;
  medication_id: string
  medication_name: string
  medication_packaging_type_description: string
  medication_stock_take_id: number
  quantity_variance: string
  unit_price: string
  user_id: string
  variance_total_price: string
  latest_stock_take_date: Date | string
}

export interface InternalPharmacyRequestInterface{
  pharmacy_request_id: string
  appointment?:AppointmentInterface
  appointment_id: string
  patient_id: string
  doctor_id: string
  medication_id: string
  medication?: MedicineInterface
  delivery_status?: number
  cost: string
  quantity: string
  hospital_id: string
  hospital_store_id: string
  pay_status: string
  prescription_term: string
  user_id: string
  user?: UserInterface
  batch_no: string
  date_of_request: string
  time_of_request: string
  discharge_drug: string
  number_of_days: string
  patient_detail?: PatientInterface
  date_dispensed: string
  time_dispensed: string
  is_exclusion: string
}

export interface InternalPharmacyRequestsDeletionsInterface{
  pharmacy_requests_deletion_id: string
  pharmacy_request_id: string
  appointment_id: string
  patient_id: string
  doctor_id: string
  medication_id: string
  delivery_status: string
  cost: string
  quantity: string
  hospital_id: string
  pay_status: string
  prescription_term: string
  user_id: string
  batch_no: string
  date_of_request: string
  time_of_request: string
  discharge_drug: string
  number_of_days: string
  hospital_store_id: string
  date_deleted: string
  time_deleted: string
  deleting_user_id: string
}

export interface InternalPharmacyRequestsReturnsInterface{
  medication_return_id: string
  appointment_id: string
  patient_id: string
  doctor_id: string
  medication_id: string
  pharmacy_request_id: string
  cost: string
  quantity_returned: string
  hospital_store_id: string
  date_of_return: string
  time_of_return: string
  hospital_id: string
  user_id: string
}

export interface InternalPharmacyRequestsUndeletableInterface{
  pharmacy_request_id: string
  appointment_id: string
  patient_id: string
  doctor_id: string
  medication_id: string
  delivery_status: string
  cost: string
  quantity: string
  hospital_id: string
  pay_status: string
  prescription_term: string
}