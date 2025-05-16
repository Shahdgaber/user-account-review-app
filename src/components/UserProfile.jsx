// src/components/UserProfile.jsx
import styles from './UserProfile.module.css';

export default function UserProfile({ user, setUser }) {
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      <div className={styles.form}>
        <label>Name</label>
        <input name="name" value={user.name} onChange={handleChange} />
        <label>Email</label>
        <input name="email" value={user.email} onChange={handleChange} />
        <label>Phone</label>
        <input name="phone" value={user.phone} onChange={handleChange} />
      </div>
    </div>
  );
}
