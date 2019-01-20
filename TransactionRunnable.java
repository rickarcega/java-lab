package arcega.hackerank.vanhack.java;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Account {
	int accountBalance;

	Account() {
		accountBalance = 0;
	}

	public String deposit(int money) {
		String action = "Depositing  US$";
		return action + money;
	}

	public String withdraw(int money) {
		String action = "Withdrawing  US$";
		return action + money;
	}

	public int getBalance() {

		return accountBalance;
	}
}

class Transaction {

	Account auxAccountObject;
	List<String> transactionList = new ArrayList<String>();

	Transaction(Account accountObject) {
		auxAccountObject = accountObject;
	}

	public void deposit(int money) {
		auxAccountObject.deposit(money);
	}

	public void withdraw(int money) {
		auxAccountObject.withdraw(money);
	}
	
	public List<String> getTransaction(){
		
		return transactionList;
	}

}

class TransactionRunnable implements Runnable {

	private static final SecureRandom RANDOM_GENERATOR = new SecureRandom();
	private final Transaction transaction;
	private final int transactionsCount;

	public TransactionRunnable(Transaction transaction, int transactionsCount) {
		this.transaction = transaction;
		this.transactionsCount = transactionsCount;
	}

	@Override
	public void run() {
		for (int i = 0; i < this.transactionsCount; i++) {
			int transactionType = RANDOM_GENERATOR.nextInt() % 2;
			int money = RANDOM_GENERATOR.nextInt(100) + 1;

			if (transactionType == 0) {
				this.transaction.deposit(money);
			} else {
				this.transaction.withdraw(money);
			}
		}
	}
}

class Solution {
	static final Scanner SCANNER = new Scanner(System.in);
	static final Account ACCOUNT = new Account();
	static final Transaction TRANSACTION = new Transaction(ACCOUNT);

	public static void main(String[] args) throws InterruptedException {
		
		System.out.println("ARCEGA");
		
		int threadsCount = Integer.parseInt(SCANNER.nextLine());
		Thread[] threads = new Thread[threadsCount];

		int expectedTransactionsCount = 0;
		for (int i = 0; i < threadsCount; i++) {
			int transactionsCount = Integer.parseInt(SCANNER.nextLine());
			expectedTransactionsCount += transactionsCount;

			threads[i] = new Thread(new TransactionRunnable(TRANSACTION, transactionsCount));
		}

		for (int i = 0; i < threadsCount; i++) {
			threads[i].start();
		}

		for (int i = 0; i < threadsCount; i++) {
			threads[i].join();
		}

		List<String> transactions = TRANSACTION.getTransaction();

		if (transactions.size() != expectedTransactionsCount) {
			System.out.println("Wrong Answer");
		} else {
			boolean correct = true;
			for (String transaction : transactions) {
				if (transaction == null) {
					correct = false;

					break;
				}
			}

			if (!correct) {
				System.out.println("Wrong Answer");
			} else {
				int balance = ACCOUNT.getBalance();

				if (balance < 0) {
					System.out.println("Wrong Answer");
				} else {
					for (String transaction : transactions) {
						System.out.println(transaction);
					}

					System.out.println("Balance $" + balance);
				}
			}
		}
	}
}