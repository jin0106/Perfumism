import { Button, Sentence } from "./index";
import styled from "styled-components";

interface RecommendButtonProps {
	firstSentence: string;
	secondSentence?: string;
	url: string;
}

function RecommendButton({ firstSentence, secondSentence, url }: RecommendButtonProps) {
	return (
		<>
			<Button to={url}>
				<Sentence>{firstSentence}</Sentence>
				<Sentence>{secondSentence}</Sentence>
			</Button>
		</>
	);
}

export default RecommendButton;
