import React from 'react';

const Analytics = ({ messages, users }) => {
  // Calculate analytics
  const totalMessages = messages.length;
  const activeUsers = users.length;
  
  const messagesLastHour = messages.filter(msg => {
    const messageTime = new Date(msg.timestamp);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return messageTime > oneHourAgo;
  }).length;

  const userActivity = messages.reduce((acc, msg) => {
    acc[msg.user] = (acc[msg.user] || 0) + 1;
    return acc;
  }, {});

  const topUsers = Object.entries(userActivity)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const averageMessagesPerUser = activeUsers > 0 ? (totalMessages / activeUsers).toFixed(1) : 0;

  return (
    <div className="analytics">
      <div className="analytics-header">
        <h3>📊 Analytics</h3>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalMessages}</div>
          <div className="stat-label">Total Messages</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{activeUsers}</div>
          <div className="stat-label">Active Users</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{messagesLastHour}</div>
          <div className="stat-label">Last Hour</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{averageMessagesPerUser}</div>
          <div className="stat-label">Avg/User</div>
        </div>
      </div>

      {topUsers.length > 0 && (
        <div className="top-users">
          <h4>🏆 Top Contributors</h4>
          <div className="top-users-list">
            {topUsers.map(([user, count], index) => (
              <div key={user} className="top-user">
                <div className="user-rank">
                  <span className={`rank-badge rank-${index + 1}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="user-details">
                  <div className="top-user-name">{user}</div>
                  <div className="top-user-messages">{count} messages</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .analytics {
          padding: 1.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .analytics-header {
          margin-bottom: 1.5rem;
        }

        .analytics-header h3 {
          color: #2c3e50;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 1rem;
          border-radius: 0.75rem;
          text-align: center;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .top-users h4 {
          color: #2c3e50;
          font-size: 1rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .top-users-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .top-user {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f8f9fa;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }

        .top-user:hover {
          background: #e9ecef;
          transform: translateX(5px);
        }

        .rank-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: white;
        }

        .rank-1 {
          background: linear-gradient(135deg, #ffd700, #ffa500);
        }

        .rank-2 {
          background: linear-gradient(135deg, #c0c0c0, #a0a0a0);
        }

        .rank-3 {
          background: linear-gradient(135deg, #cd7f32, #a56a2b);
        }

        .user-details {
          flex: 1;
        }

        .top-user-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: #2c3e50;
        }

        .top-user-messages {
          font-size: 0.8rem;
          color: #7f8c8d;
          margin-top: 0.1rem;
        }

        @media (max-width: 768px) {
          .analytics {
            padding: 1rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Analytics;