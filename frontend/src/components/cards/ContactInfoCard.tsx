import {Card, CardContent, Typography} from "@mui/material";

type Props = {
    contact: Contact;
}

const ContactInfoCard = ({contact}: Props) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{contact.name || "Unknown Contact"}</Typography>
                <Typography variant="body1">{contact.phone}</Typography>
                <Typography variant="body2">{contact.description}</Typography>
            </CardContent>
        </Card>
    );
}

export default ContactInfoCard;
