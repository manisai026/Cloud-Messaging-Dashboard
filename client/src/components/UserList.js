import React from 'react';

const UserList = ({ users, currentUser }) => {
  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>👥 Online Users</h3>
        <span className="user-count">{users.length} online</span>
      </div>
      
      <div className="users-container">
        {users.map(user => (
          <div 
            key={user.id} 
            className={`user-item ${user.username === currentUser ? 'current-user' : ''}`}
          >
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">
                {user.username}
                {user.username === currentUser && <span className="you-badge">You</span>}
              </div>
              <div className="user-status">
                <span className="status-indicator online"></span>
                Online
              </div>
            </div>
          </div>
        ))}
        
        {users.length === 0 && (
          <div className="no-users">
            <p>No users online</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .user-list {
          padding: 1.5rem;
          border-bottom: 1px solid #e1e8ed;
        }

        .user-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .user-list-header h3 {
          color: #2c3e50;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .user-count {
          background: #667eea;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .users-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 300px;
          overflow-y: auto;
        }

        .user-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .user-item:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }

        .user-item.current-user {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #74b9ff, #0984e3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .current-user .user-avatar {
          background: rgba(255, 255, 255, 0.2);
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .you-badge {
          background: rgba(255, 255, 255, 0.3);
          padding: 0.1rem 0.5rem;
          border-radius: 0.75rem;
          font-size: 0.7rem;
          font-weight: 500;
        }

        .user-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          opacity: 0.8;
          margin-top: 0.2rem;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-indicator.online {
          background: #00b894;
          animation: pulse 2s infinite;
        }

        .no-users {
          text-align: center;
          padding: 2rem 1rem;
          color: #7f8c8d;
        }

        .no-users p {
          font-size: 0.9rem;
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @media (max-width: 768px) {
          .user-list {
            padding: 1rem;
          }
          
          .users-container {
            max-height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default UserList;