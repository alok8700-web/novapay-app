export const users = [{ id: 'usr_1', name: 'Alok Singh', email: 'alok@novapay.com', passwordHash: '$2a$10$WJ3AqO4MSOYL7BKcd/QwR.zY.wTk6nDmGKbcInlvrGxuAsUIaljNm' }];
export const wallets = [
  { id: 'wal_1', userId: 'usr_1', name: 'Primary Wallet', maskedNumber: '•••• •••• 1234', balance: 15250.75, color: 'blue' },
  { id: 'wal_2', userId: 'usr_1', name: 'Savings Wallet', maskedNumber: '•••• •••• 5274', balance: 10500.5, color: 'green' },
  { id: 'wal_3', userId: 'usr_1', name: 'Travel Wallet', maskedNumber: '•••• •••• 9012', balance: 3200, color: 'purple' },
  { id: 'wal_4', userId: 'usr_1', name: 'Business Wallet', maskedNumber: '•••• •••• 3456', balance: 2000, color: 'orange' }
];
export const beneficiaries = [
  { id: 'ben_1', name: 'John Doe', account: '**** 1254', bank: 'Nova Bank' },
  { id: 'ben_2', name: 'Jane Smith', account: '**** 5678', bank: 'Metro Bank' },
  { id: 'ben_3', name: 'Rahul Kumar', account: '**** 9012', bank: 'Axis Trust' },
  { id: 'ben_4', name: 'Priya Sharma', account: '**** 3456', bank: 'Nova Bank' }
];
export const transactions = [
  { id: 'txn_1', date: '2026-06-02', description: 'Salary Credit', type: 'Income', amount: 2500, status: 'Completed' },
  { id: 'txn_2', date: '2026-06-01', description: 'Netflix Subscription', type: 'Expense', amount: -15.99, status: 'Completed' },
  { id: 'txn_3', date: '2026-05-31', description: 'Electricity Bill', type: 'Expense', amount: -85.09, status: 'Completed' },
  { id: 'txn_4', date: '2026-05-30', description: 'Money Transfer to John', type: 'Transfer', amount: -500, status: 'Completed' },
  { id: 'txn_5', date: '2026-05-29', description: 'Swiggy Order', type: 'Expense', amount: -25.6, status: 'Completed' },
  { id: 'txn_6', date: '2026-05-28', description: 'Add Money', type: 'Income', amount: 1000, status: 'Completed' },
  { id: 'txn_7', date: '2026-05-27', description: 'Mobile Recharge', type: 'Expense', amount: -19, status: 'Completed' }
];
export const chart = [5200, 8500, 7600, 10100, 9600, 12800, 11600, 12100, 9000, 9800, 14200, 13700, 15250, 18300, 23100, 24200, 23900, 25250, 28450];
