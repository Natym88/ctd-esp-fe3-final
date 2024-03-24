import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { BASE_URL } from "dh-marvel/services/APIConfig";
import { FaqsType } from "model/faq";
import { NextPage, GetStaticProps } from "next";

interface FaqsPageProps {
	faqs: FaqsType[];
}

 const FaqsPage: NextPage<FaqsPageProps> | null = ({faqs}) => {
	
	return (
		<BodySingle>
			<section>
				<h1 className="text-3xl font-bold my-6">FAQs</h1>
				<div className="grid grid-cols-1 gap-4">
					{faqs.map((faq) => (
						<div
							key={faq.id}
							className="bg-slate-950/45 rounded-lg shadow-md p-4"
						>
							<h2 className="text-lg font-semibold mb-2">{faq.question}</h2>
							<p className="text-gray-300">{faq.answer}</p>
						</div>
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