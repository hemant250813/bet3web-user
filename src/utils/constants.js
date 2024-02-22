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

export const GAME = {
  HEAD_TAIL: "head_tail",
  ROCK_PAPER_SCISSORS: "rock_paper_scissors",
  SPIN_WHEEL: "spin_wheel",
  NUMBER_GUESS: "number_guess",
  DICE_ROLLING: "dice_rolling",
  CARD_FINDING: "card_finding",
  NUMBER_SLOT: "number_slot",
  NUMBER_POOL: "number_pool",
};

export const RESULT = {
  WIN: "win",
  LOSE: "loss",
};

export const DASHBOARD_NAVBAR = [
  { name: "Dashboard", route: "dashboard", type: "dashboard", child: false },
  {
    name: "Deposit",
    route: "deposit",
    type: "dashboard",
    child: true,
    children: [
      { name: "Deposit", route: "deposit" },
      { name: "Deposit Log", route: "deposit/log" },
    ],
  },
  {
    name: "Withdraw",
    route: "withdraw",
    type: "dashboard",
    child: true,
    children: [
      { name: "Withdraw", route: "withdraw" },
      { name: "Withdraw Log", route: "withdraw/log" },
    ],
  },
  { name: "Referals", route: "referals", type: "dashboard", child: false },
  {
    name: "Reports",
    route: "reports",
    type: "dashboard",
    child: true,
    children: [
      { name: "Game Log", route: "game/log" },
      { name: "Commission Log", route: "commission/log" },
      { name: "Transactions", route: "transactions" },
    ],
  },
  {
    name: "Support",
    route: "support",
    type: "dashboard",
    child: true,
    children: [
      { name: "Open New Ticket", route: "ticket/new" },
      { name: "My Tickets", route: "ticket" },
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
      // { name: "2fa Security", route: "security" },
    ],
  },
];
