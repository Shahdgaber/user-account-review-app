import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR =
  'https://cdn-icons-png.flaticon.com/512/1077/1077114.png';

export default function AccountPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('userProfile');
    return stored
      ? JSON.parse(stored)
      : {
          avatar: '',
          name: '',
          email: '',
          phone: '',
          address: '',
          gender: '',
          dob: '',
          language: 'en',
          darkMode: true,
          social: { google: '', facebook: '' },
          passwordNew: '',
          passwordConfirm: '',
        };
  });

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('social.')) {
      const key = name.split('.')[1];
      setUser((u) => ({
        ...u,
        social: { ...u.social, [key]: value },
      }));
    } else if (type === 'checkbox') {
      setUser((u) => ({ ...u, [name]: checked }));
    } else {
      setUser((u) => ({ ...u, [name]: value }));
    }
    setError('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((u) => ({ ...u, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (
      !user.name ||
      !user.email ||
      !user.phone ||
      !user.address ||
      !user.gender ||
      !user.dob
    ) {
      setError('Please fill out all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      setError('Invalid email format.');
      return;
    }

    if (!/^\d{10,15}$/.test(user.phone)) {
      setError('Phone number must be 10 to 15 digits.');
      return;
    }

    if (user.passwordNew || user.passwordConfirm) {
      if (user.passwordNew.length < 8) {
        setError('New password must be at least 8 characters.');
        return;
      }
      if (user.passwordNew !== user.passwordConfirm) {
        setError('Passwords do not match.');
        return;
      }
    }

    const savedUser = {
      ...user,
      passwordNew: '',
      passwordConfirm: '',
    };
    localStorage.setItem('userProfile', JSON.stringify(savedUser));
    alert('Profile saved successfully!');
    setError('');
  };

  const handleReset = () => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser({
        avatar: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        gender: '',
        dob: '',
        language: 'en',
        darkMode: true,
        social: { google: '', facebook: '' },
        passwordNew: '',
        passwordConfirm: '',
      });
    }
    setError('');
  };

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    localStorage.removeItem('userProfile');
    alert('Account deleted.');
    window.location.reload();
  };

  const handleLogout = () => {
    alert('Logged out');
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  const backgroundMain = user.darkMode ? '#1a202c' : '#fff';
  const cardBackground = user.darkMode ? '#2d3748' : '#f9f9f9';
  const inputBackground = user.darkMode ? '#1a202c' : '#fff';
  const inputBorder = user.darkMode ? '#4a5568' : '#ccc';
  const textColor = user.darkMode ? '#fff' : '#222';
  const placeholderColor = user.darkMode ? '#a0aec0' : '#999';

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: backgroundMain,
        color: textColor,
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem 1rem',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: cardBackground,
          borderRadius: '12px',
          boxShadow: user.darkMode
            ? '0 0 10px rgba(0,0,0,0.5)'
            : '0 0 10px rgba(0,0,0,0.1)',
          padding: '2rem',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        <h1 style={{ marginBottom: '1.5rem' }}>User Profile</h1>

        {/* Avatar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <img
            src={user.avatar || DEFAULT_AVATAR}
            alt="Avatar"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: `2px solid ${textColor}`,
              cursor: 'pointer',
              marginBottom: '0.5rem',
            }}
            onClick={() => fileInputRef.current.click()}
            title="Click to change avatar"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          <p style={{ fontSize: '0.9rem', color: placeholderColor }}>
            Click avatar to change photo
          </p>
        </div>

        {/* Form Fields */}
        <div style={{ textAlign: 'left' }}>
          <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
          <input type="tel" name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
          <input type="text" name="address" placeholder="Address" value={user.address} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
          <select name="gender" value={user.gender} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)}>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="date" name="dob" value={user.dob} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
        </div>

        {/* Password Section */}
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', padding: '1rem', backgroundColor: user.darkMode ? '#1a202c' : '#f0f0f0', borderRadius: '8px', textAlign: 'left', border: `1px solid ${inputBorder}` }}>
          <h3 style={{ color: textColor, marginBottom: '0.8rem' }}>Change Password</h3>
          <input type="password" name="passwordNew" placeholder="New Password" value={user.passwordNew} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
          <input type="password" name="passwordConfirm" placeholder="Confirm Password" value={user.passwordConfirm} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
        </div>

        {/* Preferences */}
        <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: user.darkMode ? '#1a202c' : '#f0f0f0', borderRadius: '8px', textAlign: 'left', border: `1px solid ${inputBorder}` }}>
          <h3 style={{ color: textColor, marginBottom: '0.8rem' }}>Preferences</h3>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: textColor }}>
            Language:
            <select name="language" value={user.language} onChange={handleChange} style={{ marginLeft: '0.5rem', padding: '0.3rem 0.5rem', borderRadius: '5px', border: `1px solid ${inputBorder}`, fontSize: '1rem', backgroundColor: inputBackground, color: textColor }}>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
            </select>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', color: textColor, cursor: 'pointer' }}>
            <input type="checkbox" name="darkMode" checked={user.darkMode} onChange={handleChange} style={{ marginRight: '0.5rem' }} />
            Enable Dark Mode
          </label>
        </div>

        {/* Social Links */}
        <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <input type="text" name="social.google" placeholder="Google Profile Link" value={user.social.google} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
          <input type="text" name="social.facebook" placeholder="Facebook Profile Link" value={user.social.facebook} onChange={handleChange} style={inputStyle(inputBackground, inputBorder, textColor, placeholderColor)} />
        </div>

        {/* Error Message */}
        {error && (
          <p style={{ color: '#f56565', marginBottom: '1rem', fontWeight: 'bold' }}>
            {error}
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button onClick={handleSave} style={buttonStyle(user.darkMode ? '#3182ce' : '#2b6cb0')}>Save</button>
          <button onClick={handleReset} style={buttonStyle('#718096')}>Reset</button>
          <button onClick={handleLogout} style={buttonStyle('#e53e3e')} title="Logout">Logout</button>
          <button onClick={handleDelete} style={confirmDelete ? buttonStyle('#c53030') : buttonStyle('#9b2c2c')} title={confirmDelete ? 'Confirm Delete' : 'Delete Account'}>
            {confirmDelete ? 'Confirm Delete' : 'Delete Account'}
          </button>
          <button onClick={() => navigate('/reviews')} style={buttonStyle(user.darkMode ? '#3182ce' : '#2b6cb0')} title="Go to Reviews">
            Go to Reviews
          </button>
        </div>
      </div>
    </div>
  );
}

function inputStyle(bg, border, color) {
  return {
    width: '100%',
    padding: '0.6rem 1rem',
    marginBottom: '0.75rem',
    borderRadius: '8px',
    border: `1px solid ${border}`,
    backgroundColor: bg,
    color: color,
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
  };
}

function buttonStyle(bg) {
  return {
    backgroundColor: bg,
    color: '#fff',
    padding: '0.6rem 1.25rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    flex: '1 1 120px',
    fontSize: '1rem',
    fontWeight: '600',
  };
}
