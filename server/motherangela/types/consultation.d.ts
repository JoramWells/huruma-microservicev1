export interface ConsultationTypesGroupInterface{
  consultation_type_group_id: number;
  consultation_type_group_description: string;

}

export interface ConsultationTypesSubGroupInterface{
  consultation_type_sub_group_id: number;
  consultation_type_sub_group_description: string;
  consultation_type_group_id: string;
  consultation_types_group?: ConsultationTypesGroupInterface
  display: string;

}

export interface ConsultationGroupsWithCreditAccountInterface{
  consultation_group_id: number;
  consultation_group_description: string;
  credit_account_id: number;
}

export interface ConsultationTypeInterface{
  consultation_type_id: number;
  consultation_type_description: string;
  non_corporate_cost: number;
  corporate_cost: number;

}