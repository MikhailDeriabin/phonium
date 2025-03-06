import {Box, Button, CircularProgress} from "@mui/material";
import {ContactCard, NotFoundCard} from "@/components/cards";
import {BottomBar} from "@/components/bars";
import {IconButton} from "@/components/buttons";
import {useNavigate} from "react-router-dom";
import {useInfiniteContacts} from "@/hooks/useContacts.tsx";

const ContactList = () => {
    const navigate = useNavigate();
    const pageSize = 4;

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        error
    } = useInfiniteContacts(pageSize);

    const contacts = (data as any)?.pages.flatMap(page => page.data) || [];

    if (isError) {
        return <NotFoundCard errorText="Could not find contacts"/>;
    }

    return (
        <Box sx={{maxWidth: 500, margin: 'auto', padding: '20px', position: 'relative'}}>
            {contacts.length === 0 && !isLoading && (
                <NotFoundCard errorText="No contacts yet"/>
            )}

            <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                {contacts.map((contact) => (
                    <ContactCard key={contact.id} contact={contact}/>
                ))}
            </Box>

            {isLoading && (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                    <CircularProgress/>
                </Box>
            )}

            {hasNextPage && (
                <Box sx={{display: 'flex', justifyContent: 'center', my: 2}}>
                    <Button
                        variant="outlined"
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                    >
                        {isFetchingNextPage ? "Loading..." : "Load more"}
                    </Button>
                </Box>
            )}

            {!hasNextPage && contacts.length > 0 && (
                <Box sx={{textAlign: 'center', my: 2}}>
                    No more contacts
                </Box>
            )}

            <br/>

            <BottomBar
                rightButton={<IconButton icon="add" onClick={() => navigate('/add-contact')}/>}
            />
        </Box>
    );
};

export default ContactList;
