import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to <strong>Short URL Generator</strong> – your go-to solution for turning long, cluttered URLs into clean and compact links.
      </p>
      <p style={styles.paragraph}>
        This project was developed with simplicity, speed, and user-friendliness in mind. Whether you're sharing links on social media,
        emails, or documents, our tool ensures your URLs look clean and professional.
      </p>
      <p style={styles.paragraph}>
        <strong>Key Features:</strong>
        <ul style={styles.list}>
          <li>Instant URL shortening with a unique short code</li>
          <li>Secure redirection to the original link</li>
          <li>Role-based authentication for admins and users</li>
          <li>Rate limiting to prevent misuse</li>
          <li>Built with MERN stack (MongoDB, Express.js, React.js, Node.js)</li>
        </ul>
      </p>
      <p style={styles.paragraph}>
        This project was created by <strong>Deepam Naresh</strong>, a backend developer from NIT Patna, to explore efficient web tools and backend architecture.
      </p>
      <p style={styles.paragraph}>
        Thank you for using our service. Your feedback is always welcome!
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  heading: {
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: '30px',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '20px',
  },
  list: {
    paddingLeft: '20px',
    marginTop: '10px',
    listStyleType: 'disc',
  },
};

export default AboutUs;
