import { Box, Typography } from "@mui/material";

function Post1() {
    return (
        <Box mb={30}>
            <Typography variant="h2" mt={10} component="h1" textAlign="center">
                Jak zacząć morsowanie. Poradnik dla początkujących
            </Typography>
            <Typography mt={10} mb={5} variant="body1" mx={10}>
                <div>
                    <Typography variant="h6">ZASADY BEZPIECZNEGO ZIMOWEGO PŁYWANIA</Typography>
                    <div>
                        &bull; Uprzednia adaptacja do niższych temperatur(np. za pomocą zimnych
                        prysznic&oacute;w).
                    </div>
                    <div>
                        &bull; Spokojna rozgrzewka trwająca od 10 do 15 minut. Ma nas rozgrzać, ale
                        nie spocić.
                    </div>
                    <div>
                        &bull; Rozbieramy się zaczynając od dołu do g&oacute;ry, ubieramy odwrotnie
                        po wytarciu całego ciała.
                    </div>
                    <div>
                        &bull; Na wejście do wody możemy zabrać obuwie(od but&oacute;w neoprenowych
                        po zwykłe klapki). Kwestia odłamk&oacute;w szkła/poślizgnięcia się na
                        lodzie.
                    </div>
                    <div>
                        &bull; Czas kąpieli uzależniony jest od naszego stażu, warunk&oacute;w
                        pogodowych i aktualnego samopoczucia, nie przesadzamy. To samo odnosi się do
                        częstotliwości morsowania.
                    </div>
                    <div>
                        &bull; Przed samą kąpielą, tak jak przed każdym treningiem, trzeba być
                        wypoczętym, odżywionym i nawodnionym oraz nie wolno korzystać z
                        jakichkolwiek używek takich, jak papierosy czy alkohol. Nap&oacute;j z
                        procentami dodatkowo wychładza organizm, obniża ciśnienie krwi oraz może
                        powodować skurcze uniemożliwiające ruch w wodzie.
                    </div>
                </div>
                <div>
                    <Typography variant="h6">
                        DLA KOGO NIE JEST WSKAZANA ZIMNA TERMOGENEZA
                    </Typography>

                    <div>&bull; Dla os&oacute;b z bardzo słabą odpornością.</div>
                    <div>&bull; Dla os&oacute;b z infekcją dr&oacute;g moczowych.</div>
                    <div>&bull; Dla os&oacute;b, kt&oacute;re mają chore nerki.</div>
                    <div>
                        &bull; Dla os&oacute;b z wyczerpanymi nadnerczami i zaburzoną osią
                        podwzg&oacute;rze-przysadka-nadnercza.
                    </div>
                    <div>&bull; Dla os&oacute;b z dużą niedoczynnością tarczycy.</div>
                    <div>&bull; Dla os&oacute;b z niewydolnością krążeniową.</div>
                </div>
                <div>
                    <Typography variant="h6">CO TRZEBA ZABRAĆ</Typography>

                    <div></div>
                    <div>&bull; Ręcznik</div>
                    <div>&bull; Bieliznę na zmianę</div>
                </div>
                <div>
                    <Typography variant="h6">CO MOŻNA ZABRAĆ</Typography>

                    <div>&bull; Rękawiczki(mogą być neoprenowe)</div>
                    <div>&bull; Obuwie do wody i(może być neoprenowe)</div>
                    <div>&bull; Czapkę</div>
                    <div>&bull; Karimatę pod nogi</div>
                    <div>&bull; Szalik/komin/kominiarkę</div>
                    <div>&bull; Termos z gorącą kawą/herbatą</div>
                    <div>&bull; Pas rozgrzewający na nerki&nbsp;</div>
                    <div>&bull; Szlafrok</div>
                </div>
            </Typography>
        </Box>
    );
}

export default Post1;
