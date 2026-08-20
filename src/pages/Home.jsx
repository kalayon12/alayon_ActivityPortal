import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-bg d-flex flex-column align-items-center justify-content-center text-center text-white">
      <h1 className="home-overlay-text mb-1">Welcome to the React Activity Portal!</h1>
      <p className="home-overlay-text mb-4">Five interactive React activities demonstrating state, events, conditional logic, validation, and calculations.</p>

      <div className="activity-steps">
        <div className="activity-step">
          <div className="activity-circle">1</div>
          <span>Login</span>
          <button className="at-open-btn" onClick={() => navigate('/activity1')}>
            Open Activity
          </button>
        </div>

        <div className="activity-step">
          <div className="activity-circle">2</div>
          <span>Grade Eval.</span>
          <button className="at-open-btn" onClick={() => navigate('/activity2')}>
            Open Activity
          </button>
        </div>

        <div className="activity-step">
          <div className="activity-circle">3</div>
          <span>Password</span>
          <button className="at-open-btn" onClick={() => navigate('/activity3')}>
            Open Activity
          </button>
        </div>

        <div className="activity-step">
          <div className="activity-circle">4</div>
          <span>Electric Bill</span>
          <button className="at-open-btn" onClick={() => navigate('/activity4')}>
            Open Activity
          </button>
        </div>

        <div className="activity-step">
          <div className="activity-circle">5</div>
          <span>Attendance</span>
          <button className="at-open-btn" onClick={() => navigate('/activity5')}>
            Open Activity
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;