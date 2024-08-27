export interface Client {
    id: string;
    name: string;
    lastName: string;
    lastName2: string;
    job: string;
    phoneNumber: string;
    age: number;
    scholarship: string;
    email: string;
  }
  
  export interface Course {
    id?: string;
    courseName: string;
    courseDescription: string;
  }
  export interface Enrollment {
    id: string;
    clientId: string;
    courseId: string;
    enrollmentDate: Date;
 }
  
 export interface Transaction {
  id: string;
  course: Enrollment;
  cost?: number;
  scholarship: Client
  promotion?: number;
  amountToPay?: number;
  paymentMethod: string;
  amount: number;
  date: Date;
  folio: string;
  oneTimePayment:boolean;
  amountToPay2: string;
  status: string; // e.g., 'paid', 'unpaid'
  clientId: string;
  client: Client; // Esto permite que `client` sea opcional
}
  
  