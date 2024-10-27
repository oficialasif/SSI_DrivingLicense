// src/components/ToastNotification.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToastNotification = ({ message, type, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false); // Hide toast after 3 seconds
      if (onClose) onClose(); // Optional callback on close
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, [onClose]);

  if (!show) return null;

  return (
    <div className={`toast show align-items-center text-white bg-${type} border-0`} role="alert">
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={() => setShow(false)}
        ></button>
      </div>
    </div>
  );
};

export default ToastNotification;
