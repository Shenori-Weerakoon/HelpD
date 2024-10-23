
import PropTypes from 'prop-types';

const UserCard = ({ user }) => {
    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            {/* Add more user details as needed */}
        </div>
    );
};

// Define prop types for your component
UserCard.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        // Add more user fields as needed, like role, ID, etc.
    }).isRequired,
};

export default UserCard;
