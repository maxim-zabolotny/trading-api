// https://commerce.coinbase.com/docs/api/#webhooks
// https://www.npmjs.com/package/coinbase-commerce-node
// Coinbase Commerce need public Webhook for development. See README.md

import coinbase from 'coinbase-commerce-node';
import { ICoinBase } from '../interfaces';

const Client = coinbase.Client.init(process.env.COIN_BASE_API);
const Charge = coinbase.resources.Charge;

export const checkout = async (body: ICoinBase, metadata: any) => {
  const { quantity } = body;

  const chargeObj = new Charge({
    name: 'Покупка CLBI',
    description: '',
    metadata: metadata,
    local_price: {
      amount: quantity * 3,
      currency: 'USD',
    },
    pricing_type: 'fixed_price',
  });

  const payment = await chargeObj
    .save()
    .then((res) => ({ id: res.id, url: res.hosted_url }));
  return payment;
  // return await db.insert(payment).then(res => res.url)
};

// export const successPayment = async (id) => await db.updateOne({ id }, { status: 'success' })
// export const updatePayment = async (id) => await db.updateOne({ id }, { status: 'pending' })
// export const deletePayment = async (id) => await db.deleteOne({ id })