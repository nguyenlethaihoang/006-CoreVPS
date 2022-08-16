import LoginPage from "../layouts/Login"
import CustomerManagement from "../pages/TellerOperation/CustomerManagement"
import SignatureManagement from "../pages/TellerOperation/SignatureManagement"
import Home from "../pages/Home"
import AccountManagement from "../pages/TellerOperation/AccountManagement"
import ForeignExchange from "../pages/TellerOperation/ForeignExchange"
import InwardTransaction from "../pages/TransferOperation/Inward Transaction"
import OutwardTransaction from "../pages/TransferOperation/Outward Transaction"
// Public Routes
const publicRoutes = [
    { path: '/login', component: LoginPage},
]

// Private Routes
const privateRoutes = [
    { path: '/', component: Home},
    // { path: '/login', component: LoginPage},

    { path: '/customer_management', component: CustomerManagement},
    { path: '/signature_management', component: SignatureManagement},
    { path: '/account_management', component: AccountManagement},
    { path: '/foreign_exchange', component: ForeignExchange},
    { path: '/inward_transaction', component: InwardTransaction},
    { path: '/outward_transaction', component: OutwardTransaction}

]

export { publicRoutes, privateRoutes }