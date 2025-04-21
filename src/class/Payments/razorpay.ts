import {
  IPaymentGatewayConfig,
  IPaymentRequest,
  IPaymentResponse,
} from '../../types/payment-gateway.interface';
import { PaymentGateway } from './payment.interface';
import Razorpay from 'razorpay';

export class RazorpayPaymentGateway implements PaymentGateway {
  private razorpay!: Razorpay;
  private config: IPaymentGatewayConfig;

  constructor(config: IPaymentGatewayConfig) {
    this.config = config;
  }

  async initialize() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async processPayment(request: IPaymentRequest): Promise<IPaymentResponse> {
    const paymentIntent = await this.razorpay.orders.create(request);
    const response: IPaymentResponse = {
      success: true,
      transactionId: paymentIntent.id,
      gatewayReference: paymentIntent.id,
      rawResponse: paymentIntent,
    };
    return response;
  }

  async verifyPayment(reference: string): Promise<IPaymentResponse> {
    const paymentIntent = await this.razorpay.payments.fetch(reference);

    const response: IPaymentResponse = {
      success: true,
      transactionId: paymentIntent.id,
      gatewayReference: paymentIntent.id,
    };

    return response;
  }
  async getPaymentDetails(reference: string): Promise<any> {
    const paymentIntent = await this.razorpay.payments.fetch(reference);
    return paymentIntent;
  }
}
