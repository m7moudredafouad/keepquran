import React from 'react';

const About = () => {
	return (
		<div className="who">
			<h3>في البدايه</h3>
			<p>
				أطلب منك الدعاء لأبي بالرحمه و المغفره ولأمي بطول العمر و الرحمه و
				المغفره و لي و لإخوتي بالهدايه و التوفيق
			</p>
			<h3>ما هذا الموقع</h3>
			<p>هذا الموقع مُصمم خصيصًا ليساعدك علي حفظ القرآن الكريم</p>
			<p>التفسير المستخدم هو التفسير الميسر</p>
			<p className="mt-5">
				Copy Rights &copy; 2020{' '}
				<a
					href="https://m7moud.web.app"
					rel="noopener noreferrer"
					target="_blank"
				>
					M7moud
				</a>
			</p>
		</div>
	);
};

export default About;
