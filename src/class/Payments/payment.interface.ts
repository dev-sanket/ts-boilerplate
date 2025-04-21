import { IPaymentRequest, IPaymentResponse } from '../../types/payment-gateway.interface';

export interface PaymentGateway {
  initialize(): Promise<void>;
  processPayment(request: IPaymentRequest): Promise<IPaymentResponse>;
  verifyPayment(reference: string): Promise<IPaymentResponse>;
  //   refundPayment(request: RefundRequest): Promise<RefundResponse>
  getPaymentDetails(reference: string): Promise<any>;
}
