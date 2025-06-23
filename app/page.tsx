import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function Home() {
	return (
		<main>
			<Container>
				<Typography variant="h1" gutterBottom>
					prepen
				</Typography>
				<Button variant="contained" size="large">
					Shop now
				</Button>
			</Container>
		</main>
	);
}
