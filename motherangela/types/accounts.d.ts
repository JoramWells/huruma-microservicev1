import { AppointmentInterface } from "./appointments"
import { ServiceTypeInterface } from "./insurances"
import { PatientInterface, UserInterface } from "./patients"


export interface AccountTypeInterface{
    account_type_id:number
    account_type_description:string

}

export interface AccountingAssetStatusInterface{
    asset_status_id:number
    asset_status_description: string
}

export interface AccountingDocumentTypeInterface{
    document_type_id:number
    document_type_description:string
    document_category_description:string

}


export interface AccountingClientInterface{
    client_id: number
    client_name: string
    business_location: string
    fax: string
    mobile: string
    email_address: string
    term_of_payment_id: string
    city: string
    telephone: string
    box_address: string
}

export interface AccountingStoresInterface{
    store_id: number
    store_description: string
    store_type_id: string
    hospital_store_id: string
}

export interface AccountingItemInterface{
    item_id: number
    item_code: string
    item_description: string
    item_category_id: string
    measuring_unit_id: string
    buying_price: string
    selling_price: string
    reorder_level: string
    item_type_id: string
    parent_item_id: string
    stock_or_expense_account_id: string
    income_account_id: string
    stock_account_id: string
    item_brand_id: string
}

export interface AccountingDocumentStatusInterface{
    document_status_id: number
    document_status_description: string

}

export interface AccountingAssetsCategoryInterface{
    asset_category_id: number
    asset_category_description: string
}

export interface AccountingAssetsLocationsInterface{
    asset_location_id: number
    asset_location_description: string
}

export interface AccountingDepartmentInterface{
    department_id: number
    department_name: string
    associated_hospital_store_id: string
    hospital_store?: HospitalStoreInterface

}

export interface AccountingCostCentreInterface{
    accounting_department?: AccountingDepartmentInterface
    cost_centre_id: number
    cost_centre_description: string
    department_id: number

}

export interface AccountingGroupInterface{
    account_group_id: number
    account_group_description: string
    parent_account_group_id: string
}




export interface AccountDetailsInterface{
    account_code: string
    account_group_id: string
    account_id: number
    account_name: string
    accounting_department?: AccountingDepartmentInterface
    accounting_group?: AccountingGroupInterface
    department_id: string
    is_deletable: string
    is_level_one_parent_account: string
    parent_account_id: string
}

export interface AccountingAssetsInterface{
    accounting_asset_category?: AccountingAssetsCategoryInterface
    accounting_asset_location?: AccountingAssetsLocationsInterface
    accounting_asset_status?:AccountingAssetStatusInterface
    asset_category_id: string
    asset_description: string
    asset_id: string
    asset_location_id: string
    asset_serial_no: string
    asset_status_id: string
    condition: string
    cost: string
    custodian: string
    date_of_last_physical_check: Date | string
    date_of_purchase: Date | string
    donor_name: string
    inventory_name: string
    market_value_at_time_of_disposition: string
    method_used_to_determine_market_value: string
    property_transfer_memo: string
    quantity: string
    stock_account_id: string
    tag_number: string
    title: string
    transfer_date: Date | string
    vendor_name: string
    voucher_number: string
}

export interface AccountingDocumentsInterface{
    document_id: number
    document_type_id: string
    client_id: string
    date_of_document: Date | string
    document_number: string
    reference: string
    quantity: string
    no_of_days_due: string
    store_id: string
    item_id: string
    item_code: string
    item_description: string
    unit_price: string
    tax_id: string
    tax_amount: string
    amount: string
    serial: string
    amounts_inclusive_of_tax: string
    user_id: string
    document_status_id: string
    hospital_id: string
    full_item_description: string
    document_message: string
    department_id: string
    confirmed_or_passed_by: string
    authorized_by: string
    approved_by: string
    date_confirmed_or_passed: string
    date_authorized: Date | string
    date_approved: Date | string
    time_confirmed_or_passed: string
    time_authorized: string
    time_approved: string
    percentage_discount: string
    discount_amount: string
    cleared: string
    cleared_by: string
    document_id_reference: string
    serial_reference: string
    unit_of_measurement: string
    brand_name: string
    last_edited_by: string
    finalized_by: string
    date_of_finalization: string
    sub_item_id: string
    sub_document_type_id: string
    account_id: string
    accounting_department?: AccountingDepartmentInterface
    accounting_account_detail?: AccountDetailsInterface
    accounting_client?: AccountingClientInterface
    accounting_document_status?: AccountingDocumentStatusInterface
    accounting_document_type?: AccountingDocumentTypeInterface
    accounting_item?: AccountingItemInterface
    accounting_store?: AccountingStoresInterface
    client_name: string
    document_number_source: string
    cash_given: string
    receiving_bank_account_id: string
    reference_serial: string
    reference_receiving_bank_account_id: string
    maximum_quantity_returnable: string
    date_of_transaction: string
    time_of_transaction: string
    project_id: string
    sub_client_id: string
    reorder_level: string
    available_quantity: string
    recommended_quantity: string
    quantity_authorized_to_be_issued: string
    quantities_to_be_issued_defined: string
    quantities_to_be_issued_last_defined_by: string
    item_issued_to_project_date_of_invoice: string
    item_issued_to_project_store_id: string
    item_requisition_issuing_store_id: string
    notification_shown: string
    quantity_issued_less_returned: string
    sold_by: string
    expected_date_of_payment: string
    gate_pass_printed: string
    delivery_note_printed: string
    item_serial_number: string
    transaction_complete: string
    user_shift_id: string
    client_number_for_the_shift: string
    is_finalized: string
    date_created: string
    time_created: string

}

export interface CashPaymentModesInterface{
    cash_payment_mode_id: number
    cash_payment_mode_description: string
}

export interface AccountingBankAccountsInterface{
    bank_id: number
    bank_name: string
    account_id: string
    transaction_charges_percentage: string
}

export interface InvoicePaymentInterface{
    invoice_payment_id: number
    invoice_no: string
    amount: number
    cheque_no: number
    date_of_payment: string
    time_of_payment: string
    hospital_id: number
    user_id: number
    service_type_id: number
    service_type?: ServiceTypeInterface
    service_id: number
    service_desc: string
    bank_account_id: number
    cash_payment_mode_id: number
    cash_payment_mode?: CashPaymentModesInterface
    invoice_payment_receipt_no: number
    insurance_id: number
    withholding_tax_percentage: number
    withholding_tax_amount: number
    transaction_charges_payment: number
    transaction_charges_amount: number
    cleared: string
    cleared_by: number
    total_amount_allocated_to_invoices: number
    insurance_name_invoice_payments: number

}

export interface PersonalAccountChargeInterface{
    appointment?: AppointmentInterface
    personal_account_charge_id: number
    charge_no: number
    amount: number
    service_desc: string
    appointment_id: number
    date_of_charge: string | Date
    time_of_charge: string
    status: number
    hospital_id: number
    service_id: number
    service_type_id: number
    service_type?: ServiceTypeInterface
    quantity: number
    percentage_discount: number
    amount_before_discount: number
    discount_reason: string
    is_copay: string
    total_charge_amount: string
    total_amount_paid: string
    patient_full_name_pac: string
    admission_status: string
    patient_id_pac: number
    patient_detail: PatientInterface;
    seen_by_consultant: string
    doctor_name: string
    clinic_id: number
    clinic_name: string

}

export interface PersonalChargesPaymentsInterface{
    appointment?: AppointmentInterface
    charge_payment_id: number
    charge_no: number
    amount: number
    date_of_payment: string | Date
    time_of_payment: string
    hospital_id: number
    user_id: number
    user: UserInterface | null;
    service_id: number
    service_type_id: number
    service_type?: ServiceTypeInterface
    receipt_no: string
    service_desc: string
    cash_payment_mode_id: number
    reference: string
    bank_account_id: number
    transaction_charges_percentage: number
    transaction_charges_amount: number
    cleared: string
    cleared_by: number
    admission_status: string
    is_copay_personal_charge_payments: string
    appointment_id_personal_charge_payments: number
    patient_full_name_pcp: string
    seen_by_consultant: string
    doctor_name: string
    clinic_id: number
    clinic_name: string
    account_id: string
    date_of_application_to_inpatient_bill: string
    linked_insurance_id: number
    unit_cost_of_sale: number
    quantity_cost_of_sale: number
    cost_of_sale_account_id: number
    stock_account_id: number
    user_shift_id: number
    account_group_id: number
    refund_bank_account_id: number
    refund_reference_number: number
    refund_amount: number
    date_of_refund: string | Date
    refund_payment_mode_id: number
    admission_status: string
    patient_id_personal_charge_payments: number
    patient_detail: PatientInterface;

}