import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { BASE_URL } from "dh-marvel/services/APIConfig";
import { FaqsType } from "model/faq";
import { NextPage, GetStaticProps } from "next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FaqsPageProps {
	faqs: FaqsType[];
}

const FaqsPage: NextPage<FaqsPageProps> | null = ({ faqs }) => {

	return (
		<BodySingle>
			<section>
				<h1 className="text-3xl font-bold my-6">FAQs</h1>
				<div className="grid grid-cols-1 gap-4">
					{faqs.map((faq) => (
						<Accordion key={faq.id}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1-content"
								id="panel1-header"
							>{faq.question}</AccordionSummary>
							<AccordionDetails>
								<p className="text-gray-300">{faq.answer}</p>
							</AccordionDetails>
						</Accordion>
					))}
				</div>
			</section>
		</BodySingle>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const response = await fetch(BASE_URL + "api/faqs");
	const faqs = await response.json();

	return {
		props: {
			faqs: Array.isArray(faqs) ? faqs : [],
		},
	};
};

export default FaqsPage;