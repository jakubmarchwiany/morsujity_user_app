import { Box, Typography } from "@mui/material";


function Contact() {
    return (
        <Box mb={30} textAlign="center">
            <Typography variant="h1">Kontakt</Typography>
            <Typography mt={10} mb={5} variant="h5">
                Znalazłeś błąd lub masz pytanie.
                <br /> Napisz maila z pytanie. Staram sie odpisywać jak najszybciej
                <br />
                <br />
                <br /> Morsujity
                <br /> 50-302 Wroclaw, Poland
                <br />
                <a href="mailto:name@email.com">jacobmarchwiany@gmail.com</a>
            </Typography>
        </Box>
    );
}

export default Contact;
