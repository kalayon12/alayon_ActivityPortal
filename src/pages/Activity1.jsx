import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const CORRECT_USERNAME = 'admin';
const CORRECT_PASSWORD = '12345';

function Activity1() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username.trim() === '' && password.trim() === '') {
      setMessage('Please enter username and password.');
      return;
    }

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setMessage('Login successful!');
      setIsLoggedIn(true);
    } else {
      setMessage('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setMessage('');
    setIsLoggedIn(false);
  };

  return (
    <div className="login-page-wrapper">
      <Container>
        <Card className="login-card border-0">
          <Row className="g-0">
            {/* LEFT: BMO */}
            <Col md={6} className="login-card-left d-flex align-items-center justify-content-center">
              <Card.Img
                src="https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/8/81/BMO.png/revision/latest?cb=20200613123757"
                alt="BMO"
                style={{ maxWidth: '220px', width: '100%' }}
              />
            </Col>

            <Col md={6} className="login-card-right">
              <Card.Body className="p-4 p-md-5">
                {!isLoggedIn ? (
                  <>
                    <Card.Title as="h3" className="fw-bold">
                      Login Authentication
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-4">
                      Please enter your details
                    </Card.Subtitle>

                    <Form onSubmit={handleLogin}>
                      <FloatingLabel label="Username" className="mb-3">
                        <Form.Control
                          type="text"
                          placeholder="Enter username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </FloatingLabel>

                      <FloatingLabel label="Password" className="mb-3">
                        <Form.Control
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FloatingLabel>

                      {message && (
                        <Alert
                          variant={message === 'Login successful!' ? 'success' : 'danger'}
                          className="py-2"
                        >
                          {message}
                        </Alert>
                      )}

                      <Button type="submit" className="login-btn-dark w-100">
                        Log In
                      </Button>
                    </Form>
                  </>
                ) : (
                  <div className="text-center">
                    <Card.Title as="h3" className="fw-bold">
                      Welcome, {username}!
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-4">
                      You are now logged in.
                    </Card.Subtitle>
                    <Button className="login-btn-dark" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default Activity1;