import { UserInterface } from "./patients";
export interface MedicationInterface {
    medication_name: string;
}
export interface MedicineCategory {
    category_name: string;
}
export interface MedicinePackageTypeInterface {
    package_description: string;
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
    price: string | null;
    price_corporate: string | null;
    price_foreigner: string | null;
    quantity: number | null;
    reorder_level: number | null;
    sell_at_buying_price: string | null;
    visible: string | null;
}
export interface MedicineCategoryInterface {
    category_id: number;
    category_name: string;
    credit_account_id: string;
    hospital_id: string;
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
    hospital_id: string;
}
export interface MedicinePurchaseInterface {
    batch_no: string;
    bonus: number;
    date_of_receipt: Date | string | null;
    expiry_date: Date | string | null;
    hospital_id: string;
    hospital_store: HospitalStoreInterface;
    hospital_store_id: string;
    medication: MedicationInterface;
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
    supplier?: SupplierInterface;
    supplier_id: string | null;
    tax_percentage: string | null;
    user: UserInterface;
    user_id: string;
}
export interface MedicationStockTakeInterface {
    correct_quantity: string;
    current_quantity: string;
    current_quantity_total_price: string;
    date_of_stock_take: Date | string | null;
    expiry_date: Date | string;
    hospital_id: string;
    hospital_store_id: string;
    medication_category_id: string;
    medication_id: string;
    medication_name: string;
    medication_packaging_type_description: string;
    medication_stock_take_id: number;
    quantity_variance: string;
    unit_price: string;
    user_id: string;
    variance_total_price: string;
}
export {};
