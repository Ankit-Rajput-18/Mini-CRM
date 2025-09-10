import React from 'react';

export default function Pagination({ meta, onPageChange }) {
  if (!meta) return null;
  const { page, pages } = meta;
  return (
    <div className="flex">
      <button onClick={() => onPageChange(Math.max(1, page - 1))}>Prev</button>
      <div className="small" style={{ padding: '8px 12px' }}>{page} / {pages}</div>
      <button onClick={() => onPageChange(Math.min(pages, page + 1))}>Next</button>
    </div>
  );
}
