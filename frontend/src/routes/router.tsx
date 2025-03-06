import { createBrowserRouter } from "react-router-dom";
import ContactList from "@/pages/ContactList";
import ContactDetails from "@/pages/ContactDetails";
import ErrorPage from "@/pages/ErrorPage";
import {Layout} from "@/components/layout";
import AddContact from "@/pages/AddContact.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <ContactList /> },
            { path: "contact/:id", element: <ContactDetails /> },
            { path: "add-contact", element: <AddContact /> }
        ],
    },
]);
