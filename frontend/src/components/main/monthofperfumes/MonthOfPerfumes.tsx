import perfumeApi from "apis/perfume";
import Spinner from "components/Spinner";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MonthPerfume from "./MonthPerfume";

function MonthOfPerfumes() {
	const [perfumes, setPerfumes] = useState([]);

	useEffect(() => {
		const getPerfumes = async () => {
			const monthOfPerfumes = await perfumeApi.getMonthOfPerfumes();
			setPerfumes(monthOfPerfumes.data);
		};
		getPerfumes();
	}, []);

	return (
		<Section>
			<Title>이 달의 인기 향수</Title>
			{perfumes ? (
				perfumes.map((perfume, idx) => (
					<Container>
						<MonthPerfume perfume={perfume} key={idx} />
					</Container>
				))
			) : (
				<Spinner />
			)}
		</Section>
	);
}

export default MonthOfPerfumes;

const Section = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 50rem;
	@media ${(props) => props.theme.mobileS} {
		height: auto;
	}
`;

const Title = styled.p`
	font-size: 3rem;
	font-weight: bold;
	margin: 2rem auto;
	margin-top: 3rem;
`;

const Container = styled.div`
	display: flex;
	@media ${(props) => props.theme.mobileS} {
		flex-direction: column;
	}
`;
