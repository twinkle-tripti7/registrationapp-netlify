import React, { useState } from 'react';
import googleIcon from '../Images/google_login.png'; 
import facebookIcon from '../Images/fb_login.jpeg'; 
import twitterIcon from '../Images/twitter_login.jpeg'; 
 import logo from '../Images/logo.jpeg';
import './css/style.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    age: '',
    gender: '',
    location: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.number) newErrors.number = 'Number is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.location) newErrors.location = 'Location is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const missingFields = Object.keys(newErrors).map(field => field.charAt(0).toUpperCase() + field.slice(1)).join(', ');
      window.alert(`${missingFields} is missing. Form not submitted.`);
    } else {
      // Construct cookie string
      const cookieString = Object.keys(formData).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`).join('; ');
      
      // Set cookie with expiration date (example: expires in 1 day)
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1); // expires in 1 day
      document.cookie = `${cookieString}; expires=${expirationDate.toUTCString()}; path=/`;
  
      console.log('Cookie set:', cookieString); // Log the cookie data to console
  
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        number: '',
        email: '',
        age: '',
        gender: '',
        location: '',
      });
      setErrors({});
    }
  };
    

  return (
    <div className='whole_background'>
    <div className='welcome_box'>
    <div className="logo-container">
    <img  className="logo" src={logo} alt="logo"/>
    <div className="logo_text">
     <h3>loGo</h3>
     </div>
     </div>
        <div className="welcome-text">
          <h2> Welcome Back!</h2>
          <p>To keep connected with us, please register with us.</p>
        </div>
    </div>

    <div  className="form">
      <p className='register'>REGISTER</p>
      <div className="social-icons">
        <img src={googleIcon} alt="Google" className="icon_google"/>
        <img src={facebookIcon} alt="Facebook" className="icon_fb"/>
        <img src={twitterIcon} alt="Twitter" className="icon_twitter"/>
      </div>
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'location'].map((field) => (
          <div key={field} className="form-group">
            <input
              type="text"
              id={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className={errors[field] ? 'error-input' : ''}
            />
            {errors[field] && <span className="error">*Not entered</span>}
          </div>
        ))}
        <div className="form-group">
          <input
            type="tel"
            id="number"
            name="number"
            placeholder="Number"
            value={formData.number}
            onChange={handleChange}
            className={errors.number ? 'error-input' : ''}
          />
          {errors.number && <span className="error">*Not entered</span>}
        </div>
        <div className="form-group">
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            className={errors.age ? 'error-input' : ''}
          />
          {errors.age && <span className="error">*Not entered</span>}
        </div>
        <div className="form-group">
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? 'error-input' : ''}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="Transgender">Transgender</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error">*Not chosen</span>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
