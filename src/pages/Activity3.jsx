import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Placeholder from 'react-bootstrap/Placeholder';
import ProgressBar from 'react-bootstrap/ProgressBar';

const IMAGES = {
  default: 'https://avatarfiles.alphacoders.com/364/thumb-1920-364547.png',
  weak: 'https://w0.peakpx.com/wallpaper/371/439/HD-wallpaper-adventure-time-adventuretime-cn-cool-dog-jake-love-music-perrito-yellow.jpg',
  medium: 'https://cdn.dribbble.com/userupload/25739513/file/original-77724554b1870ef16d19892ca89c8526.png',
  strong: 'https://pbs.twimg.com/media/E0y6R6DX0AsN5y2.jpg',
};

function Activity3() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);

  const checkStrength = (pw) => {
    const length = pw.length;
    let level, label, message, percent, variant;

    if (length < 6) {
      level = 'weak';
      label = 'Weak';
      message = 'Create a stronger password.';
      percent = 33;
      variant = 'danger';
    } else if (length <= 9) {
      level = 'medium';
      label = 'Medium';
      message = 'Consider creating a longer password.';
      percent = 66;
      variant = 'warning';
    } else {
      level = 'strong';
      label = 'Strong';
      message = 'You can use this password.';
      percent = 100;
      variant = 'success';
    }

    return { level, label, message, percent, variant };
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (password.trim() === '') {
      setError('Please enter a password.');
      return;
    }

    setResult(checkStrength(password));
    setImgLoaded(false);
  };

  const handleClear = () => {
    setPassword('');
    setResult(null);
    setError('');
  };

  const currentImage = result ? IMAGES[result.level] : IMAGES.default;

  return (
    <Container className="pass-page-wrapper" fluid>
      <div className="pass-card">
        {/* LEFT: Jake image */}
        <div className="pass-card-left">
          {!imgLoaded && (
            <Placeholder as="div" animation="wave" className="pass-img-placeholder">
              <Placeholder xs={12} className="pass-img-placeholder-block" />
            </Placeholder>
          )}
          <img
            src={currentImage}
            alt="Jake status"
            onLoad={() => setImgLoaded(true)}
            style={{ display: imgLoaded ? 'block' : 'none' }}
          />
        </div>

        {/* RIGHT: Form */}
        <div className="pass-card-right">
          <h3>Password Strength Checker</h3>
          <p className="subtitle">Classify a password by length as Weak, Medium, or Strong.</p>

          <Form onSubmit={handleCheck}>
            <FloatingLabel
              controlId="passwordInput"
              label="Password"
              className="pass-input-group"
            >
              <Form.Control
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <div className="pass-char-count">Character count: {password.length}</div>

            {error && (
              <Alert variant="danger" className="py-2">
                {error}
              </Alert>
            )}

            <div className="pass-btn-row">
              <Button type="submit" variant="warning" className="pass-btn-primary">
                Check Password
              </Button>
              <Button
                type="button"
                variant="light"
                className="pass-btn-outline"
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </Form>

          {result && (
            <Alert variant="light" className={`pass-result ${result.level}`}>
              <div className={`pass-status ${result.level}`}>
                Password Status: {result.label}
              </div>
              <div className={`pass-message ${result.level}`}>{result.message}</div>
              <ProgressBar
                now={result.percent}
                variant={result.variant}
                className="pass-strength-bar"
                label={result.label}
              />
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Activity3;