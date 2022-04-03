//const bd = require('../../models');
const { Banks } = require('../../db/models');
const BankDeclineError = require('../../errors/BankDeclineError');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount] = await Banks.update(data,
    { attributes: ['cardNumber', 'name', 'expiry', 'cvc', 'balance'], where: predicate, returning: ['cardNumber', 'name', 'expiry', 'cvc', 'balance'], transaction });
  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
