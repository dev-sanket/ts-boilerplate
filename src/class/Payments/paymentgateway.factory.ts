import { PaymentGatewayType } from '../../enums';
import { IPaymentGatewayConfig } from '../../types';
import { PaymentGateway } from './payment.interface';
import { RazorpayPaymentGateway } from './razorpay';

export class PaymentGatewayFactory {
  static async createPaymentGateway(
    type: PaymentGatewayType,
    config: IPaymentGatewayConfig
  ): Promise<PaymentGateway> {
    let gateway: PaymentGateway;
    switch (type) {
      case PaymentGatewayType.RAZORPAY:
        gateway = new RazorpayPaymentGateway(config);
        break;
      default:
        throw new Error(`Unsupported payment gateway type: ${type}`);
    }

    await gateway.initialize();
    return gateway;
  }
}
