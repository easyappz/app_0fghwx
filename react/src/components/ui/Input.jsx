import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, hint, className = '', ...props }, ref) => {
  return (
    <div data-easytag="id1-react/src/components/ui/Input.jsx" className="w-full">
      {label && (
        <label data-easytag="id2-react/src/components/ui/Input.jsx" className="block mb-1 text-sm text-muted">
          {label}
        </label>
      )}
      <input
        data-easytag="id3-react/src/components/ui/Input.jsx"
        ref={ref}
        className={`w-full rounded-xl border border-line bg-white px-3 py-2 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent transition ${className}`}
        {...props}
      />
      {hint && (
        <p data-easytag="id4-react/src/components/ui/Input.jsx" className="mt-1 text-xs text-muted">{hint}</p>
      )}
    </div>
  );
});

export default Input;
