import { AxiosResponse } from "axios";
import { request } from "./request";

interface RecommendApiType {
	createSurveyRecommend: (answer: {
		a1: string | null;
		a2: string | null;
		a3: string | null;
		a4: string | null;
		a5: string | null;
	}) => Promise<AxiosResponse>;
}

const recommendApi: RecommendApiType = {
	createSurveyRecommend: (answer) => request.post(`설문추천api`, answer),
};

export default recommendApi;
