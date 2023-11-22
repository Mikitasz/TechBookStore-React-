import React from 'react';

function About() {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold mb-4">About TechBookStore</h1>
        <p className="text-lg mb-8">
          Welcome to TechBookStore, your one-stop destination for all things tech-related. We are passionate about technology and its impact on our lives, and we're here to provide you with the latest and greatest in tech literature.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-8">
          At TechBookStore, our mission is to empower individuals with knowledge about cutting-edge technology. We believe that learning is a lifelong journey, and we are committed to providing you with the most up-to-date books, e-books, and resources to help you stay ahead in the fast-paced world of tech.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Collection</h2>
        <p className="text-lg mb-8">
          Our curated collection includes a wide range of tech topics, from programming and artificial intelligence to cybersecurity and emerging technologies. Whether you're a seasoned developer or just getting started, we have something for everyone.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Why Choose TechBookStore?</h2>
        <ul className="text-lg mb-8 list-disc list-inside pl-4">
          <li>Extensive Selection: We offer a vast selection of books from the best authors and publishers in the tech industry.</li>
          <li>Expert Recommendations: Our team of tech enthusiasts provides expert recommendations to help you find the perfect book.</li>
          <li>Convenience: Shop online 24/7 from the comfort of your home and have books delivered to your doorstep.</li>
          <li>Quality Assurance: We ensure that all our books are of the highest quality, so you can trust the content you're reading.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-lg">
          Have questions or suggestions? We'd love to hear from you. You can reach out to us at <a href="mailto:info@techbookstore.com" className="text-blue-600">info@techbookstore.com</a> or give us a call at (123) 456-7890.
        </p>
      </div>
    </div>
  );
}

export default About;
