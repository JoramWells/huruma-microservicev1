export interface PayrollEmployeeCategoryInterface{
    employee_category_id: number
    employee_category_description: string
}

export interface PayrollPeriodsInterface{
    payroll_id: string
    pay_period_id: string
    payroll_description: string
    start_date: Date | string
    end_date: Date | string
    fiscal_month: string
    fiscal_year: string
    deduct_nssf: string
    deduct_nhif: string
    hospital_id: string
    employee_category_id: string
    payroll_employee_category?: PayrollEmployeeCategoryInterface
}

export interface PayrollEmployeeRecordsInterface{
    active_status: number | null
    address: string | null
    bank_account_number: string | null
    bank_branch: string | null
    bank_id: string | null
    branch_code: string | null
    cellphone: string | null
    city_of_residence: string | null
    date_of_birth: Date | string | null
    date_of_start_of_regular_payment: Date | string | null
    deduct_nhif: string | null
    deduct_nssf: string | null
    department_id: string | null
    email: string | null
    employee_category: string | null
    employee_id: number
    employee_status_id: string | null
    full_name: string | null
    gender: string | null
    hire_date: Date | string | null
    hospital_id: string
    hourly_rate: string
    id_number: string | null
    insurance_relief: string | null
    job_number: string | null
    job_title_id: string
    kra_pin_number: string
    marital_status: string | null
    maximum_number_of_hours_per_month: string
    nationality: string
    nhif_number: string
    nssf_number: string
    pay_period_id: string
    pay_type_id: string
    payroll_reason_for_leaving_id: string | null
    period_date: string | null
    retire_date: Date | string | null
    tax_category_id: string | null
    tax_status_id: string | null
    termination_date: string | null
    user_id: string | null
}

export interface PayrollOtherIncomeAndAllowancesInterface{
    other_income_id: number
    other_income_description: string
    taxable_state_id: string
    benefit_type_id: string

}

export interface PayrollEmployeeBenefitsFileInterface{
    amount: string | number | null
    employee_benefits_file_id: number
    employee_id: string | null
    other_income_type_id: string | null
    payroll_employee_record?: PayrollEmployeeRecordsInterface
    payroll_id: string | null
    payroll_period?: PayrollPeriodsInterface
    payroll_other_income_and_allowance?: PayrollOtherIncomeAndAllowancesInterface
}

export interface PayrollDeductionInterface{
    deduction_id: string
    deduction_description: number
    taxable_state_id: number
}

export interface PayrollEmployeeDeductionInterface{
    employee_deduction_id: number
    deduction_id: string
    employee_id: number
    fiscal_month: number
    fiscal_year: number
    fixed_amount: number
    percentage_amount: string
    hospital_id: string
    payroll_deduction?: PayrollDeduction
    payroll_employee_record?: PayrollEmployeeRecordsInterface
}

export interface PayrollEmployeeLoanRecordsInterface{
    loan_id: string
    employee_id: string
    loan_reference: string
    loan_description: string
    loan_date: string
    loan_type_id: string
    loan_amount: string
    starting_loan_balance: string
    monthly_installment: string
    monthly_interest_rate: string
    interest_formula_id: string
    fringe_benefit_tax: string
    deduction_start_date: Date | string 
    hospital_id: string
    payroll_employee_record?: PayrollEmployeeRecordsInterface

}

export interface PayrollEmployeeMonthlyDeductionInterface{
    monthly_deduction_id: string
    deduction_id: string
    employee_id: string
    amount: string
    hospital_id: string
    payroll_employee_record?: PayrollEmployeeRecordsInterface
    payroll_deduction?: PayrollDeduction

}

export interface PayrollEmployeeMonthlyDeductionFileInterface{
    monthly_deduction_file_id: string
    payroll_id: string
    employee_id: string
    deduction_id: string
    amount: string
    payroll_employee_record?: PayrollEmployeeRecordsInterface
    payroll_deduction?: PayrollDeduction

}

export interface PayrollTaxCategoryInterface{
    tax_categories_id: string
    tax_category_description: string
}

export interface PayrollTaxableStateInterface{
    taxable_state_id: string
    taxable_state_description: string

}

export interface PayrollTaxStatusInterface{
    tax_status_id: string
    taxable_state_description: string
    personal_exemption: number
    additional_exemption: number

}

export interface PayrollPeriodEmployeePayCalculationsInterface{
    payroll_period_employee_pay_calculation_id: number
    payroll_id: string
    employee_id: string
    department_id: string
    job_title_id: string
    employment_status_id: string
    job_number: string
    regular_hours: string
    absent_hours: string
    late_hours: string
    period_rate: string
    hourly_rate: string
    basic_pay: string
    other_income_total_amount: string
    earnings_total_amount: string
    absent_total_amount: string
    late_total_amount: string
    overtime_total_amount: string
    gross_pay: string
    gross_taxable: string
    nssf_amount: string
    taxable_pay: string
    tax_amount: string
    gross_pay_after_tax: string
    advance_pay: string
    loan_deduction_amount: string
    fringe_benefit_tax_amount: string
    net_pay: string
    employee_category_id: string
    monthly_deductions_total_amount_taxable: string
    monthly_deductions_total_amount_non_taxable: string
    deductions_total_amount_taxable: string
    deductions_total_amount_non_taxable: string
    pension_amount_taxable: string
    pension_amount_non_taxable: string
    quarters_value_amount: string
    kudheiha_amount: string
    long_service_pay_amount: string
    payroll_employee_record?: PayrollEmployeeRecordsInterface
    personal_relief: string
    directorate_of_industrial_training_amount: string
    bank_id: string
    bank_branch: string
    branch_code: string
    bank_account_number: string
    insurance_relief: string
    tax_category_id: string
    nhif_relief: string

}

export interface PayrollEmployeeLoanDeductionsInterface{
    loan_deduction_id: number
    payroll_id: string
    employee_id: string
    loan_id: string
    amount: string
    amount_plus_interest: string
    payroll_employee_record?: PayrollEmployeeRecordsInterface
    payroll_periods?: PayrollPeriodsInterface
    payroll_employee_loan_record?: PayrollEmployeeLoanRecordsInterface

}

export interface PayrollOtherIncomeAndAllowancesInterface{
    other_income_id: number
    other_income_description: string
    taxable_state_id: string
    benefit_type_id: string

}