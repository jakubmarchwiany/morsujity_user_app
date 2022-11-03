import { Container, Typography } from "@mui/material";

function Contact() {
    return (
        <Container
            component='main'
            sx={{
                px: { xs: 5, sm: 30, md: 15, lg: 30, xl: 40 },
            }}
        >
            <Typography variant='h1' textAlign='center'>
                Kontakt
            </Typography>
            <Typography mt={10} variant='h5' textAlign='center'>
                Znalazłeś błąd lub masz pytanie.
                <br /> Napisz maila z pytanie. Staram sie odpisywać jak najszybciej
                <br />
                <br />
                <br /> Morsujity
                <br /> 50-302 Wroclaw, Poland
                <br />
                <a href='mailto:name@email.com'>jacobmarchwiany@gmail.com</a>
            </Typography>
        </Container>
    );
}
export default Contact;
