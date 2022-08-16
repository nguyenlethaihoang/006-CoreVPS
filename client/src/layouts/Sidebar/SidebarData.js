import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CreateIcon from '@mui/icons-material/Create';
import BadgeIcon from '@mui/icons-material/Badge';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';

export const SidebarData = [
  {
    title: "Teller Operation",
    path: "#",
    icon: <SupervisedUserCircleIcon size="large" />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Customer Management",
        path: "/customer_management",
        icon: <ManageAccountsIcon />
      },
      {
        title: "Signature Management",
        path: "/signature_management",
        icon: <CreateIcon />
      },
      {
        title: "Account Management",
        path: "/account_management",
        icon: <BadgeIcon />
      },
      {
        title: "Foreign Exchange",
        path: "/foreign_exchange",
        icon: <CurrencyExchangeIcon />
      }
    ]
  },

  // Second

  {
    title: "Transfer Operation",
    path: "#",
    icon: <TransferWithinAStationIcon />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Outward Transaction",
        path: "/outward_transaction",
        icon: <FlightTakeoffIcon />
      },
      {
        title: "Inward Transaction",
        path: "/inward_transaction",
        icon: <FlightLandIcon />
      },
    ]
  },

  // Third
  {
    title: "Credit Operation",
    path: "#",
    icon: <FaIcons.FaCartPlus />
  },

  // Four
  {
    title: "Trade Finance Operation",
    path: "#",
    icon: <IoIcons.IoMdPeople />
  }
];
