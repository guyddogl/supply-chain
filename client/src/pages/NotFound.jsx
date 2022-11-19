import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      NotFound
      <Link to="/">Home</Link>
    </div>
  );
}