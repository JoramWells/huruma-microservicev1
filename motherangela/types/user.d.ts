export interface UserTypeInterface{
  user_type_id: number;
  user_type_desc: string;

}

export interface UserInterface {
  user_id: string;
  user_type_id: string;
  user_type?: UserTypeInterface;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  status: string;
  hospital_id: string;
  navigation_style: string;
  consultation_income_percentage: string;
  procedure_income_percentage: string;
}