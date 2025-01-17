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