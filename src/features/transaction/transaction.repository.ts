import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "./transaction.model";
import * as transactionService from "./transaction.service";

export const transactionRepository = {
  fetchAll: transactionService.fetchTransactions,
  create: (input: CreateTransactionInput) =>
    transactionService.createTransaction(input),
  update: (id: string, input: UpdateTransactionInput) =>
    transactionService.updateTransaction(id, input),
  delete: (id: string) => transactionService.deleteTransaction(id),
};
