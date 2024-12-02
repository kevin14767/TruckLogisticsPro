import { BaseReceipt } from '../imagedetails/ReceiptInterfaces';

export type PostStackParamList = {
  PostScreen: undefined; // No params for PostScreen
  ImageDetailsScreen: { uri: string }; // ImageDetailsScreen expects a URI string
  VerificationScreen: { receipt: BaseReceipt; uri: string };
  ReportScreen: { receipt: BaseReceipt; uri: string };
};
