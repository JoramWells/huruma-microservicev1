import { AppointmentInterface } from "./appointments"
import { InternalLabRequestInterface } from "./lab"
import { PatientInterface } from "./patients"
import { UserInterface } from "./user"


export interface ProcedureCategoryInterface{
    category_id: number,
    category_name: string,
    hospital_id: number,
    credit_account_id: number,

}

export interface ProcedureInterface{
    procedure_id: number,
    procedure_name: string,
    procedure_cost: number,
    procedure_category_id: number,
    procedure_category?: ProcedureCategoryInterface,
    hospital_id: number,
    procedure_cost_corporate: number,
    normal_values: string,
    procedure_cost_foreigner: number,
    order_code: string,
    print_number: string,
    lancet_mnemonic: string,
    test_type: string,
    ionic: string,
    procedure_cost_night: string,
    withholding_tax_percentage: number,
    discount_applicability: string,
    results_posting_lock_setting: string,
    procedure_cost_insurance: number,
    show_procedure_items_table_headers: string,
    procedure_group_id: number,
    suspended: string,
}

export interface ProcedureItemsConclusionsInterface{
    procedure_items_conclusion_id: number,
    procedure_items_conclusion_description: string,
    procedure_id: number,
    procedure_detail?: ProcedureInterface

}

export interface ProcedureItemInterface{
    procedure_item_id: number,
    procedure_item_description: string,
    normal_values: string,
    procedure_id: number,
    procedure_detail?: ProcedureInterface
    order_position: string,
    normal_values_start: string,
    normal_values_end: string, 
    show_normal_values: string,
    show_flag: string,
    show_input: string,
    show_procedure_item_checked_value: string,
    show_negative_and_positive_options_only: string,
    show_malignant_and_non_malignant_options_only: string,
    allow_numerical_input_only: string,

}



export interface ProcedureItemResultsInterface{
    procedure_item_result_id: number,
    appointment?: AppointmentInterface
    appointment_id: number,
    procedure_item_id: number,
    procedure_item?: ProcedureItemInterface,
    input: string,
    internal_lab_request?:InternalLabRequestInterface
    normal_values: string,
    flag: string,
    microscopy?: string,
    lab_request_id: number,
    procedure_item_checked_value: string,
    procedure_items_conclusion_id: number,
    procedure_items_conclusion?: ProcedureItemsConclusionsInterface,
    procedure_items_conclusion_description: string,

}
