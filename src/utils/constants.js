export const defaultChipValues = [
  { name: "100", value: 100 },
  { name: "1,000", value: 1000 },
  { name: "2,000", value: 2000 },
  { name: "5,000", value: 5000 },
  { name: "10,000", value: 10000 },
  { name: "20,000", value: 20000 },
  { name: "50,000", value: 50000 },
  { name: "100,000", value: 100000 },
];

export const ACCOUNT_TYPE = [
  { name: "saving", value: "saving" },
  { name: "current", value: "current" },
];

export const HOME_NAVBAR = [
  { name: "Home", route: "home", type: "home", child: false },
  { name: "About Us", route: "aboutus", type: "home", child: false },
  { name: "Game", route: "game", type: "home", child: false },
  { name: "Blog", route: "blog", type: "home", child: false },
  { name: "Contact", route: "contact", type: "home", child: false },
];

export const DASHBOARD_NAVBAR = [
  { name: "Dashboard", route: "dashboard", type: "dashboard", child: false },
  {
    name: "Deposit",
    route: "deposit",
    type: "dashboard",
    child: true,
    children: [
      { name: "Deposit", route: "deposit" },
      { name: "Deposit Log", route: "deposit_log" },
    ],
  },
  {
    name: "Withdraw",
    route: "withdraw",
    type: "dashboard",
    child: true,
    children: [
      { name: "Withdraw", route: "withdraw" },
      { name: "Withdraw Log", route: "withdraw_log" },
    ],
  },
  { name: "Referals", route: "referals", type: "dashboard", child: false },
  {
    name: "Reports",
    route: "reports",
    type: "dashboard",
    child: true,
    children: [
      { name: "Game Log", route: "game_log" },
      { name: "Commission Log", route: "commission_log" },
      { name: "Transactions", route: "transactions" },
    ],
  },
  {
    name: "Support",
    route: "support",
    type: "dashboard",
    child: true,
    children: [
      { name: "Open New Ticket", route: "open_new_ticket" },
      { name: "My Tickets", route: "my_tickets" },
    ],
  },
  {
    name: "Account",
    route: "account",
    type: "dashboard",
    child: true,
    children: [
      { name: "Profile Setting", route: "profile_setting" },
      { name: "Change Password", route: "change_password" },
      { name: "2fa Security", route: "security" },
    ],
  },
];
